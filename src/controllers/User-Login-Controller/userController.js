const jwt = require('jsonwebtoken');
const User = require('../../models/user'); // Assuming you have a User model

// Controller function to fetch username based on token
async function getUsername(req, res){
  const token = req.body.token; // Get token from request body
  if (!token) {
    return res.status(400).json({ message: 'Token not provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'); // Use the same secret key used to sign the token
    const userId = decoded.id; // Extract user ID from the decoded token

    // Find the user in the database based on user ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log(user);
    // If user found, send back the username
    res.status(200).json({ username: user.username });
  } catch (error) {
    console.error('Error fetching username:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = getUsername;
