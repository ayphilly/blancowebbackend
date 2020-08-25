var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');
var mongoose = require('mongoose');
const db = require('./server/config/connection');
const bodyParser = require('body-parser');
const cors = require ('cors');
require('./server/model/user.js');
require('./server/model/product.js');
require('./server/model/category.js');
const dotenv = require('dotenv')
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");

var indexRouter = require('./server/routes/index');
var usersRouter = require('./server/routes/users');
var productsRouter = require('./server/routes/product');
var categoryRouter = require('./server/routes/category');

var app = express();
const port = process.env.PORT || 4000;
app.set(port)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(
  cors({
    credentials: true,
    origin :true
  })
)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



//index router
app.use('/api/index', indexRouter);
//userRouter
app.use('/api/user', usersRouter);

app.use('/api/product', productsRouter);
app.use('/api/category', categoryRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//const server = http.createServer(app);
app.listen (port, ()=> console.log(`app runing on : ${port}`));
module.exports = app;
