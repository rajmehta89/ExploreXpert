const User = require("../../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const LoginUserData = require("../../models/userdatalogin");
const getUserid = require("./userController1");

async function logout(req, res) {
  try {
      const token = req.body.token;
      console.log(token);
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const decoded = jwt.verify(token, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'); // Use the same secret key used to sign the token
    const userId = decoded.id;
    console.log(userId);
    // Delete the user data from the database
    await LoginUserData.deleteOne({userId }); // Delete data associated with the user ID

    // Send a success response
    res.status(200).json({ message: 'Logout successful' });
    console.log('Logout Successfull');
  } catch (error) {
    // Handle errors
    console.error('Error logging out:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = logout;
