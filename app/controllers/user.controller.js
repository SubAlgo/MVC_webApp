
//-------login-------------
exports.login = function(req, res) {
  /*
  console.log(req.body);
  console.log('Email:' + req.body.email);
  console.log('Password: ' + req.body.password);
  */

  req.checkBody('email', 'Invalid email').notEmpty().isEmail();
  req.sanitizeBody('email').normalizeEmail();
  var errors = req.validationErrors();
  if (errors) {
    res.render('index',{
      title: 'There have been validation errors: ' + JSON.stringify(errors),
      isLoggedIn: false
    });
    return;
  }
  //---Manage session---
  if (req.body.remember === 'remember') {
      req.session.remember = true;
      req.session.email = req.body.email;
      //req.sessionOptions.maxAge = 60000; //milliseconds
      req.session.cookie.maxAge = 60000;
  }
  //---Manage session---

  res.render('index', {
    title: 'Logged in as ' + req.body.email,
    isLoggedIn: true
  });
  console.log('Print body.remember: ' + req.body.remember);
  console.log('Print Session.remember: ' + req.session.remember);
  console.log('Print Session.email: ' + req.session.email);
};
//-------login-------------


//-------logout-------------
exports.logout = function(req, res) {
  req.session = null; // Destroy session
  res.render('index', {
    title: 'See you again later',
    isLoggedIn: false
  });
};
//-------logout-------------
