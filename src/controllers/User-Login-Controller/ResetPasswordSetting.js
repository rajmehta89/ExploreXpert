const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

const User = require("../../models/user");

const passwordResetTokens = new Map();
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '21ituos032@ddu.ac.in',
        pass: 'mlrl yeml rfok cdmx',
    },
});

async function sendEmail(req, res) {
    const { newEmail, frontendUrl } = req.body;
    // console.log(req.body);

    try {
        const user = await User.findOne({ email: newEmail });
        console.log(user);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const resetToken = uuid.v4();
        passwordResetTokens.set(resetToken, { userId: user.id, email: user.email });

        const resetLink = `http://${frontendUrl}/reset-password/${resetToken}`;

        // Send password reset email
        transporter.sendMail({
            to: user.email,
            subject: 'Password Reset',
            text: `Click the following link to reset your password: ${resetLink}`,
        });

        res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
        console.error('Error sending password reset email:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = { sendEmail, passwordResetTokens };
