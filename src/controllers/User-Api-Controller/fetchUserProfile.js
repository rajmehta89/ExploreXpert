const jwt = require('jsonwebtoken'); // Import the jwt module

const User = require('../../models/user');
const LoginUserData = require('../../models/userdatalogin');

// Controller function for fetching user profile data
async function fetchUserProfile(req, res) {
  try {
    const token = req.token; // Token is extracted by the verifyToken middleware

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: Missing token' });
    }
    
    // Verify the token
    const decoded = jwt.verify(token, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'); // Replace 'your_secret_key' with your actual secret key
    const userId = decoded.id;

    // Find user data by userId
    const user = await LoginUserData.findOne({ userId });

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized: User not found' });
    }
    console.log(user);
    res.json({user});
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = fetchUserProfile;
