// Import necessary modules
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const LoginUserData = require('../../models/userdatalogin');

async function updateProfile(req, res) {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Extract the token from the request headers

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: Missing token' });
    }
    
    // Verify the token
    const decoded = jwt.verify(token, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'); // Replace 'your_secret_key' with your actual secret key
    const userId = decoded.id;

    // Extract updated username and email from request body
    const { username, email } = req.body;

    // Update user data in the User collection
    const updatedUser = await User.findByIdAndUpdate(userId, { username, email }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user data in the LoginUserData collection
    const updatedLoginUserData = await LoginUserData.findOneAndUpdate({ userId }, { username, email }, { new: true });

    if (!updatedLoginUserData) {
      return res.status(404).json({ error: 'LoginUserData not found' });
    }

    res.json({ user: updatedUser, loginUserData: updatedLoginUserData });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = updateProfile;
