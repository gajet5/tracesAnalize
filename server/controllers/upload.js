const path = require('path');
const formidable = require('formidable');
const fs = require('fs-extra');
const config = require(path.join(__basedir, 'config'));
const uploadsModel = require(path.join(__basedir, 'models', 'uploads'));
const reportsModel = require(path.join(__basedir, 'models', 'reports'));
const vocabularyParser = require(path.join(__basedir, 'services', 'vocabularyParser'));

async function formFactory(uploadsDirName) {
    const form = new formidable.IncomingForm();

    await fs.ensureDir(config.server.uploadsDir);
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

        form
            .on('error', (err) => {
                res.json({
                    error: err
                });
            })
            .on('file', async (name, file) => {
                await fs.rename(file.path, path.join(form.uploadDir, file.name));
                console.log('Time file: ', Date.now());
            })
            .on('end', () => {
                console.log('Time end: ', Date.now());
                res.json({
                    status: 'OK',
                    id: Math.round(Math.random() * 1000)
                });
            });

        form.parse(req);
    },

    // POST /upload/vocabulary
    async vocabulary(req, res) {
        const upload = await uploadsModel.create({
            report: await reportsModel.create({
                parsed: false
            })
        });
        const form = await formFactory('uploadsVocabularyDir');

        form
            .on('error', (err) => {
                upload.delete();
                res.json({
                    error: err
                });
            })
            .on('file', async (name, file) => {
                const filePath = path.join(form.uploadDir, file.name);
                await fs.rename(file.path, filePath);
                await upload.updateOne({
                    name: file.name,
                    path: filePath,
                    uploadFileType: 'Vocabulary'
                });
                await vocabularyParser(upload.id);
            })
            .on('end', () => {
                res.json({
                    status: 'OK',
                    id: upload.id
                });
            });

        form.parse(req);
    }
};
