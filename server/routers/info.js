const path = require('path');
const { Router } = require('express');
const router = Router();
const infoController = require(path.join(__basedir, 'controllers', 'info'));

router.get('/report/:id', infoController.report);

module.exports = router;
