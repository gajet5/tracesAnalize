const fs = require('fs-extra');
const path = require('path');
const config = require(path.join(__basedir, 'config'));
const unpack = require(path.join(__basedir, 'utils', 'unpack'));

module.exports = async () => {
    const zipFile = path.join(config.server.uploadsVocabularyDir, 'resources.zip');
    const unzipPath = path.join(config.server.uploadsVocabularyDir, '_tmp');

    await fs.ensureDir(config.server.uploadsDir);
    await fs.ensureDir(unzipPath);

    if (!await unpack(zipFile, unzipPath)) {
        console.log('Ошибка при распаковке архива.');
        return false;
    }

    let files = await fs.readdir(path.join(unzipPath, 'locs'));

    console.log(files);
    return files;
};
