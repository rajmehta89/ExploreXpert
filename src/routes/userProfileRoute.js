// userProfileRoute.js

const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Import the User model
const verifyToken = require('../middleware/verifyUserToken'); // Import the verifyToken middleware

// Route to get user profile
router.get('/', verifyToken, async (req, res) => {
    try {   
        console.log('in userProfileRoute');
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const userId = req.user.id;
        const user = await User.findById(userId).select('username email');
        console.log('user details',user);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ username: user.username, email: user.email });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
