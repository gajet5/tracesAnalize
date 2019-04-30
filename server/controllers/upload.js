const path = require('path');
const formidable = require('formidable');
const fs = require('fs-extra');
const config = require(path.join(__basedir, 'config'));
const vocabularyParser = require(path.join(__basedir, 'services', 'vocabularyParser'));

async function formFactory(uploadsDirName) {
    const form = new formidable.IncomingForm();

    await fs.ensureDir(config.server[uploadsDirName]);

    form.encoding = 'utf-8';
    form.uploadDir = config.server[uploadsDirName];
    form.maxFileSize = 1024 * 1024 * 500; // 50mb
    form.multiples = false;

    return form;
}

module.exports = {

    // POST /upload/traces
    async traces(req, res) {
        const form = await formFactory('uploadsTracesDir');

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
    },

    // POST /upload/vocabulary
    async vocabulary(req, res) {
        const form = await formFactory('uploadsVocabularyDir');

        form.parse(req, (err, fields, { file }) => {
            console.log('parse');
        });

        form.on('file', (name, file) => {
            console.log('file');
        });

        form.on('end', async () => {
            res.json({
                status: 'OK',
                files: await vocabularyParser()
            });
            console.log('end');
        });
    }
};
