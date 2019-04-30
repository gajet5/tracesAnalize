global.__basedir = __dirname;

const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const config = require(path.join(__basedir, 'config'));

const server = express();

server.use(cors());
server.use(morgan('tiny'));

const indexRouter = require(path.join(__basedir, 'routers', 'index'));
const uploadRouter = require(path.join(__basedir, 'routers', 'upload'));

server.use('/', indexRouter);
server.use('/upload', uploadRouter);

server.listen(config.server.port, () => {
    console.log(`http://localhost:${config.server.port}/`);
});
