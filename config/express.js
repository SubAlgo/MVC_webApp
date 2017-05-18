var express = require('express');

/*
https://www.youtube.com/watch?v=93GfL42eUv0&list=PLtM3znnbMbVXD0fygCTsblC2sLZvSPY8g&index=19
อธิบายการทำงาน
*/
module.exports = function() {
  var app = express();
  require('../app/routes/index.routes')(app);
  return app;

};
