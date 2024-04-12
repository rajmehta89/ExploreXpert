const express = require('express');
const handlesignup = require("../controllers/User-Login-Controller/sigup");
const handleLogin = require("../controllers/User-Login-Controller/login");
const { sendEmail } = require("../controllers/User-Login-Controller/ResetPasswordSetting");
const handleGoogleSignUp = require("../controllers/User-Login-Controller/GoogleSignUp");
const handleResetPasswordEditing = require("../controllers/User-Login-Controller/ResetPasswordEditing");
const verifyToken = require('../middleware/verifyUserToken');
const getToken = require('../controllers/User-Login-Controller/GetToken.controller');
const getUsername = require('../controllers/User-Login-Controller/userController');
const getUserid = require('../controllers/User-Login-Controller/userController1');
const logout = require('../controllers/User-Login-Controller/logout');


const router = express.Router();

// router
//     .route('/login')
//     .post(getUserData)
//     .get(verifyToken,getToken)

router
    .route('/loginhere')
    .post(handleLogin)
    .get(verifyToken, getToken)


router
    .route('/signup')
    .post(handlesignup)


// router
//     .route('/googlesign')
//     .post(handleGoogleSignUp)



router
    .route('/forgot-password-setting')
    .post(sendEmail)

router
    .route('/forgot-password-editing')
    .post(handleResetPasswordEditing)

// Route to fetch username based on token
router
    .route('/getUsername')
    .post(getUsername);

router
    .route('/getUserid')
    .post(getUserid);

    
    
router
    .route('/logout')
    .post(logout);

module.exports = router;