var express = require('express');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
/*
https://www.youtube.com/watch?v=93GfL42eUv0&list=PLtM3znnbMbVXD0fygCTsblC2sLZvSPY8g&index=19
อธิบายการทำงาน
*/
module.exports = function() {
  var app = express();

  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else {
    app.use(compression('production'));
  }

  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());

  //-----Set Jade View------
  app.set('views', './app/views');
  app.set('view engine', 'jade');
  //-----Set Jade View------


  require('../app/routes/index.routes')(app);
  return app;

};
