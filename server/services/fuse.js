module.exports = {
    beforeStart() {
        for (let item in process.versions) {
            if (item === 'node') {
                let majorVersion = parseInt(process.versions[item].split('.')[0]);

                if (majorVersion < 12) {
                    throw new Error('Version nodejs must be 12 or higher.');
                }
            }
        }
    }
};
