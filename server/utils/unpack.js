const extract = require('extract-zip');

module.exports = (pathToZip, pathToFolder) => {
    return new Promise(resolve => {
        extract(pathToZip, {dir: pathToFolder}, (err) => {
            if (err) {
                console.log(err);
                resolve(false);
                return;
            }
            resolve(true);
        });
    });
};