const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Uploads = new Schema({
    name: {
        type: String
    },
    path: {
        type: String
    },
    uploadDate: {
        type: Date,
        default: Date.now
    },
    uploadFileType: {
        type: String,
        enum: ['Traces', 'Vocabulary']
    },
    report: {
        type: Schema.Types.ObjectId,
        ref: 'Reports'
    }
});

module.exports = mongoose.model('Uploads', Uploads);
