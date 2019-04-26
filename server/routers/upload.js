const path = require('path');
const { Router } = require('express');
const router = Router();

const uploadController = require(path.join(__basedir, 'controllers', 'upload'));

router.post('/', uploadController);

module.exports = router;
