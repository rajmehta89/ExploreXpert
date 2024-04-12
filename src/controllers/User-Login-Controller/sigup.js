const User = require("../../models/user");
const bcrypt = require('bcrypt');

async function handlesignup(req, res) {

    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log('Sign Up');
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = handlesignup;