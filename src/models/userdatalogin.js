const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccordionItemSchema = new Schema({
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

const LoginUserDataSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
    
    },
    selectedItems: {
        type: [Object],
        default:null,
        
    },
    startDate: {
        type: Date,
        default:null,
    },
    endDate: {
        type: Date,
        default:null,
     
    },

    accordionItems: {
        type: [AccordionItemSchema], // Array of AccordionItemSchema objects
        default: [] // You can set a default value if needed
    },
    
    favPlaces: {
        type: [Object], // Array of AccordionItemSchema objects
        default: [] // You can set a default value if needed
    }
});

module.exports = mongoose.model('LoginUserData', LoginUserDataSchema);
