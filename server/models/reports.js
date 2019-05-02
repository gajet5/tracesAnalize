const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Reports = new Schema({
    createDate: {
        type: Date,
        default: Date.now
    },
    parsed: {
        type: Boolean
    },
    report: {}
});

module.exports = mongoose.model('Reports', Reports);
