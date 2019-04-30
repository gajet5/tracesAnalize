const path = require('path');
const { Router } = require('express');
const router = Router();

const uploadController = require(path.join(__basedir, 'controllers', 'upload'));

router.post('/traces', uploadController.traces);
router.post('/vocabulary', uploadController.vocabulary);

module.exports = router;
