const User = require('../models/user');

// Controller function for fetching user profile data
exports.fetchUserProfile = async (req, res) => {
  try {
    // Get username from request query parameters
    const { username } = req.query;
    // Query MongoDB for user profile data based on username
    const user = await User.findOne({ username }).select('username email');

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Respond with user profile data
    res.json({ username: user.username, email: user.email });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
