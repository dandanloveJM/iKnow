var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const logger = require('./utils/logger').logger
const Errors = require('./errors.js') 
var index = require('./routes/index');
var users = require('./routes/user');
const topicRouter = require('./routes/topic')
require('./services/mongoose_service.js')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./middlewares/req_log').logRequests())

app.use('/', index);
app.use('/user', users);
app.use('/topic', topicRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // // render the error page
  // res.status(err.status || 500);
  // res.render('error');

  if(err instanceof Errors.BaseHttpError ){
    res.statusCode = err.httpCode
    res.json({
      code: err.MYCode,
      msg: err.httpMsg,

    })
  } else {
    res.statusCode = 500
    res.json({
      code:Errors.BaseHttpError.DEFAULT_MYCODE,
      msg: '服务器好像出错了诶～'
    })

    
  }
  logger.error('response error to user ', err)
});

module.exports = app;
