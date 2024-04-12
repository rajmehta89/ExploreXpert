const User = require("../../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const LoginUserData = require("../../models/userdatalogin");

async function handleLogin(req, res) {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id, email: user.email }, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', { expiresIn: '10h' });

        //console.log(user.username);
        console.log('username ',user.username);
        // Update the token in the User document
        user.tokens = token;
        await user.save();

        // Check if there's already a document in LoginUserData for this user
        let loginInfo = await LoginUserData.findOne({ userId: user._id });

        if (!loginInfo) {
            console.log('new user');
            loginInfo = new LoginUserData({
                username: user.username,
                userId: user._id,
                email: user.email,
                password: user.password, // Save the actual password used for authentication
                token: token
            });

            await loginInfo.save();
        } else {
            loginInfo.token = token;
            await loginInfo.save();
        }


        // Send response
        res.status(200).json({ message: 'Login successful', token: token, user: user });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = handleLogin;
