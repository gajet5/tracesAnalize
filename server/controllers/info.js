const path = require('path');
const reportsModel = require(path.join(__basedir, 'models', 'reports'));

module.exports = {
    async report(req, res) {
        const reportResult = await reportsModel.findById(req.params.id);

        res.json({
            status: reportResult.parsed,
            reportTraces: reportResult.report ? reportResult.report : null
        });
    }
};
