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
    report: [
        {
            time: {
                type: String
            },
            event: {
                type: String
            },
            string: {
                type: String
            },
            source: {
                type: String
            }
        }
    ]
});

module.exports = mongoose.model('Reports', Reports);
