const mongoose = require('mongoose');

// Define a schema for the Accordiontem
const AccordionItemSchema = new mongoose.Schema({

        header: {
            type: String,
            default:null,
        },
        itinerary: {
            type: [Object],
            default:null,
        },
        isOpen: {
            type: Boolean,
            default:null
        }
    
});

// Define a schema for the User
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirm_password: {
        type: String,
        required: false
    },
    tokens: {
        type: String,
        unique: true
    },
    placesvisited: [{
        startDate: {
            type: Date,
            default: null,
        },
        endDate: {
            type: Date,
            default: null,
        },
        accordionItems: {
            type: [AccordionItemSchema], // Array of AccordionItemSchema objects
            default: [] // You can set a default value if needed
        }
    }]
});

const User = mongoose.model('User', UserSchema);
module.exports = User;