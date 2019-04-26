const path = require('path');
const { Router } = require('express');
const router = Router();

const indexController = require(path.join(__basedir, 'controllers', 'index'));

router.get('/', indexController);

module.exports = router;
