// server.js
const User = require("../../models/user");
const { passwordResetTokens } = require("./ResetPasswordSetting");
const bcrypt = require('bcrypt');

// Endpoint for handling password reset
async function editPasswordReset(req, res) {
    const { token, newPassword } = req.body;
    console.log(token);
    const tokenData = passwordResetTokens.get(token);


    try {
        // Update user's password (replace this with your database update logic)
        const user = await User.findById(tokenData.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;

        // Save the updated user to the database
        await user.save();

        passwordResetTokens.delete(token);
        return res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = editPasswordReset;