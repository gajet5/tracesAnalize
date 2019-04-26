global.__basedir = __dirname;

const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const server = express();

server.use(cors());
server.use(morgan('tiny'));

const indexRouter = require(path.join(__basedir, 'routers', 'index'));
const uploadRouter = require(path.join(__basedir, 'routers', 'upload'));

server.use('/', indexRouter);
server.use('/upload', uploadRouter);

server.listen(4321, () => {
    console.log('http://localhost:4321/');
});
