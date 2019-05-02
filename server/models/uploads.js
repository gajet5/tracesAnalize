const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Uploads = new Schema({
    name: {
        type: String,
        trim: true
    },
    uploadDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Uploads', Uploads);
