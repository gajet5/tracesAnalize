const path = require('path');
const formidable = require('formidable');
const fs = require('fs-extra');

module.exports = (req, res) => {
    const form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = path.join(__basedir, 'uploadDir');
    form.maxFileSize = 1024 * 1024 * 500; // 50mb
    form.multiples = false;

    form.parse(req, (err, fields, { file }) => {
        console.log('parse');
    });

    form.on('file', (name, file) => {
        console.log('file');
    });

    form.on('end', () => {
        console.log('end');
        res.json({
            status: 'OK'
        });
    });
};
