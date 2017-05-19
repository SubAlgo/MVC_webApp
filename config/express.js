var express = require('express');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');

var sass = require('node-sass-middleware');
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

  //-----Set Sass Compile------
  app.use(sass({
    src: './sass',
    dest: './public/css',
    outputStyle: 'expanded', //mode[compressed, compact, expanded]
    prefix: '/css', //ตัดไม่ต้องสร้าง/css/..
    debug: true
    //indentesSyntax: true กรณีใช้Syntax แบบ Sass ที่อาศัยการย่อหน้า
  }));
  //-----Set Sass Compile------

//-----Set static file------
app.use(express.static('./public'));
//-----Set static file------

  return app;

};
