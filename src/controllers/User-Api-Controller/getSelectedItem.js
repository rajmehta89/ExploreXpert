const jwt = require('jsonwebtoken');
const LoginUserData = require('../../models/userdatalogin');
const mongoose = require('mongoose');

async function getSelectedItem(req, res) {
    try {
        // Extract token from request headers
        const token = req.token; // Token is extracted by the verifyToken middleware

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized: Missing token' });
        }

        try {
            // Verify the token
            const decoded = jwt.verify(token, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'); // Replace 'your_secret_key' with your actual secret key
            const userId = decoded.id;

            // Find user data by userId
            const loginData = await LoginUserData.findOne({ userId });

            if (!loginData) {
                return res.status(401).json({ error: 'Unauthorized: User not found' });
            }

            // If user data found, send it to the frontend
            return res.status(200).json({ message: 'User data fetched successfully', data: loginData });
        } catch (error) {
            console.error('Error:', error);
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ error: 'Unauthorized: Token expired' });
            }
            return res.status(401).json({ error: 'Unauthorized: Invalid token' });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = getSelectedItem;
