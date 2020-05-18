var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const settings = require('./appsettings');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var gitlabRouter = require('./routes/gitlab');
var telegramBotRouter = require('./routes/telegramBot');

var authorization = require('./middlewares/authorization');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

if (settings.Flags.useMongo) {
  var connection = require("./mongodb/connection");
  app.use(connection.connection(app, {}));
}

app.use(authorization.authorization(app, {}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/gitlab', gitlabRouter);
app.use('/telegrambot', telegramBotRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
