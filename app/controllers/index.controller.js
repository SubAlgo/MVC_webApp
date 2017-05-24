exports.render = function(req, res){
	var isLoggedIn = false;

	if (typeof req.session.remember !== 'undefined'){  //req.session 'session คือชื่อที่เราตั้งไว้ที่ไฟล์ express.js ตรง name: 'session' 
		 isLoggedIn = req.session.remember;
	}

	res.render('index', {
		'title1' : 'Hello World By Jade',
		'message1' : 'Message HelloWorld render by Jade!!',
		isLoggedIn: isLoggedIn
	});
};
