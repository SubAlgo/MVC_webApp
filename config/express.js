var express = require('express');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');

var sass = require('node-sass-middleware');
var validator = require('express-validator');
//var cookieSession = require('cookie-session');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
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

  /*
  app.use(cookieSession({
    name: 'session', //ใส่ชื่ออะไรก็ได้ เป็นชื่อ Session ของเรา
    keys: ['secret_key1', 'secret_key2']
  }));
  */
  app.use(session({

    secret: 'secret_key',
    resave: false,
    saveUninitialized: true

    //---------Config Redis---------
    /*store: new RedisStore({
      host: 'localhost',
      port: 6379,
      db: 2,
      pass: 'redis_password'
    }),
    secret: 'secret_key'
    */
  }));

  app.use(bodyParser.urlencoded({
    extended: true //false -> string กับ array
                   //true -> ประเภทใดก็ได้ (เช่น nested array*array หลายมิติ)
  }));
  app.use(bodyParser.json());
  app.use(validator()); //ใช้สำหรับตรวจสอบค่า ใส่ต่อจาก bodyParser ทันที

  //-----Set Jade View------
  app.set('views', './app/views');
  app.set('view engine', 'jade');
  //-----Set Jade View------

  //-----Set Routes------
  require('../app/routes/index.routes')(app);
  require('../app/routes/user.routes')(app);
  //-----Set Routes------

  //-----Set Sass Compile------
  app.use(sass({
    src: './sass',
    dest: './public/css',
    outputStyle: 'compressed', //mode[compressed, compact, expanded]
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
