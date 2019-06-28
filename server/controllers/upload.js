const path = require('path');
const formidable = require('formidable');
const fs = require('fs-extra');
const config = require(path.join(__basedir, 'config'));
const uploadsModel = require(path.join(__basedir, 'models', 'uploads'));
const reportsModel = require(path.join(__basedir, 'models', 'reports'));
const vocabularyParser = require(path.join(__basedir, 'services', 'vocabularyParser'));
const tracesParser = require(path.join(__basedir, 'services', 'tracesParser'));

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
        const upload = await uploadsModel.create({
            report: await reportsModel.create({
                parsed: false
            })
        });
        const form = await formFactory('uploadsTracesDir');

        form
            .on('error', (err) => {
                upload.delete();
                res.json({
                    error: err
                });
            })
            .on('file', async (name, file) => {
                await upload.updateOne({
                    name: file.name,
                    path: file.path,
                    uploadFileType: 'Traces'
                });
                await tracesParser(upload.id, upload.report.id);
            })
            .on('end', () => {
                res.json({
                    status: 'OK',
                    id: upload.report.id
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
                    id: upload.report.id
                });
            });

        form.parse(req);
    }
};
