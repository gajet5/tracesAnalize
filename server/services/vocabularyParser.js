const fs = require('fs-extra');
const readline = require('readline');
const path = require('path');
const config = require(path.join(__basedir, 'config'));
const unpack = require(path.join(__basedir, 'utils', 'unpack'));
const uploadModels = require(path.join(__basedir, 'models', 'uploads'));
const reportModels = require(path.join(__basedir, 'models', 'reports'));
const vocabularyModels = require(path.join(__basedir, 'models', 'vocabularys'));

module.exports = async (uploadId) => {
    const upload = await uploadModels.findById(uploadId);
    const zipFile = upload.path;
    const unzipPath = path.join(config.server.uploadsVocabularyDir, '_tmp');

    await fs.ensureDir(unzipPath);

    if (!await unpack(zipFile, unzipPath)) {
        console.log('Ошибка при распаковке архива.');
        return false;
    }

    const unzipPathOfLocs = path.join(unzipPath, 'locs');
    let files = await fs.readdir(unzipPathOfLocs);

    for (let file of files) {
        const lines = readline.createInterface({
            input: fs.createReadStream(path.join(unzipPathOfLocs, file)),
            crlfDelay: Infinity
        });

        for await (const line of lines) {
            const result = config.regexp.vocabulary.exec(line);

            if (!result) {
                continue;
            }

            const key = result[1];
            const value = result[2];
            const vocabulary = await vocabularyModels.findOne({
                key,
                value
            });

            if (vocabulary) {
                await vocabulary.updateOne({
                    key,
                    value,
                    updateDate: Date.now()
                });
            } else {
                await vocabularyModels.create({
                    key,
                    value
                });
            }
        }
    }

    await reportModels.findOneAndUpdate(
        {
            _id: upload.report
        },
        {
            parsed: true
        }
    );

    await fs.remove(zipFile);
    await fs.remove(unzipPath);
};
