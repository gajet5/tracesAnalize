const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Vocabularys = new Schema({
    key: {
        type: String
    },
    value: {
        type: String
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    updateDate: {
        type: Date
    }
});

module.exports = mongoose.model('Vocabularys', Vocabularys);
