const jwt = require('jsonwebtoken');
const LoginUserData = require('../../models/userdatalogin');
const mongoose = require('mongoose');

async function storeData(req, res) {
    try {
        // Extract token from request headers
        const token = req.token; // Token is extracted by the verifyToken middleware

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized: Missing token' });
        }


        console.log("ferkf");
        // Token is verified, proceed to check against the stored token in the database
        const { selectedItem, startDate, endDate } = req.body;

        console.log("hello");
        console.log(selectedItem,startDate,endDate);

        try {
            // Find user data by token
            const loginData = await LoginUserData.findOne({ token });
            console.log(loginData);
            if (!loginData) {
                return res.status(401).json({ error: 'Unauthorized: Invalid token' });
            }

            console.log(selectedItem);
            console.log(startDate);
            console.log(endDate);
            
            // Update the token data
            loginData.selectedItems= selectedItem;
            loginData.startDate = startDate;
            loginData.endDate = endDate;

            // Save the updated data
            const savedData = await loginData.save();
            console.log("saved");
            
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
