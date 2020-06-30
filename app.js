var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var cons = require('consolidate');

var connection = require('./config');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var authController=require('./controllers/auth-controller');
var registerController=require('./controllers/register-controller');


// view engine setup
// app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

/*API's route to handle login and registration */
app.post('/api/register',registerController.register);
app.post('/api/auth',authController.authenticate);
 
console.log(authController);
app.post('/controllers/register-controller', registerController.register);
app.post('/controllers/auth-controller', authController.authenticate);

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
let port = 3000;
app.listen(port);
console.log("[Express running] http://127.0.0.1:"+ port +"....");

module.exports = app;
