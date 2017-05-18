exports.render = function(req, res){
	res.render('index', {
		'title' : 'Hello World By Jade',
		'message' : 'Message HelloWorld render by Jade!!'
	});
};
