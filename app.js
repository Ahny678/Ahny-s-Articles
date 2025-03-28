var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sequelize = require('./config/database');

//-------------DB TESTING----------------------

(async () => {
  try {
    await sequelize.authenticate();
    sequelize
      .sync({ alter: true }) 
      .then(() => console.log("> Database & tables created!"))
      .catch((err) => console.error("> Error syncing database:", err));

    console.log("> Database connected successfully!");
  } catch (error) {
    console.error("> Database connection error:", error);
  }
})();

//----------------------------------------------
const About = require('./models/about');
const Articles = require('./models/articles');
const Users = require('./models/users');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var articlesRouter = require('./routes/articles');
var aboutRouter = require('./routes/about');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/users', aboutRouter);
app.use('/articles', articlesRouter);

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

module.exports = app;
