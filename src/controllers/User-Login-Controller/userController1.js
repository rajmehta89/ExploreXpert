const jwt = require('jsonwebtoken');
const User = require('../../models/user'); // Assuming you have a User model

async function getUserid(req, res){
  const token = req.body.token; // Get token from request body
  if (!token) {
    return res.status(400).json({ message: 'Token not provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'); // Use the same secret key used to sign the token
    const userId = decoded.id; // Extract user ID from the decoded token

    // Find the user in the database based on user ID
    res.status(200).json({ userId: userId });
  } catch (error) {
    console.error('Error fetching userId:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = getUserid;
