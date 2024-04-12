const mongoose = require('mongoose');

async function connectMongoDb(url) {
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

}

module.exports = {
    connectMongoDb,
};