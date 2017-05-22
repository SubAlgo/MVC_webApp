exports.render = function(req, res){
	res.render('index', {
		'title1' : 'Hello World By Jade',
		'message1' : 'Message HelloWorld render by Jade!!'
	});
};
