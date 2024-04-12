const jwt = require('jsonwebtoken');
const LoginUserData = require('../../models/userdatalogin');
const mongoose = require('mongoose');
const User = require("../../models/user");

async function storeData(req, res) {
    try {
        // Extract token from request headers
        const token = req.token; // Token is extracted by the verifyToken middleware

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized: Missing token' });
        }

        console.log("token",token);

        const user = await User.findOne({tokens:token});

        console.log("user-data",user);
      
        // Token is verified, proceed to check against the stored token in the database
        const {accordionItems} = req.body;
        console.log("accordion items",accordionItems);

        try {
            // Find user data by token
            const loginData = await LoginUserData.findOne({ token });
      
            
            if (!loginData) {
                return res.status(401).json({ error: 'Unauthorized: Invalid token' });
            }

            // Update the token data
            loginData.accordionItems= accordionItems;
   
            console.log(accordionItems);
            console.log(loginData);
            
            user.placesvisited.push({
                accordionItems: loginData.accordionItems,
                startDate: loginData.startDate,
                endDate: loginData.endDate
            });
            
           const savedDatau=await user.save();
           console.log(savedDatau);
            // Save the updated data
            const savedData = await loginData.save();
            if (savedData) {
                console.log("Data stored successfully");
                return res.status(200).json({ message: 'Data stored successfully' });
            } else {
                console.log("Failed to save data");
                return res.status(500).json({ error: 'Failed to save data' });
            }
        } catch (error) {
            console.error('Error:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = storeData;