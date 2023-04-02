const express = require('express');
let dotenv = require('dotenv');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
dotenv.config()

let indexRouter = require('./routes/index');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

module.exports = app;
