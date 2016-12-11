var express = require("express");
var app = express();
var api = require("NeteaseMusicApi");

app.use(express.static('./'));

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.get('/',function(req,res){
	res.send('hi');
});

app.get('/api/search/:text/:page/:limit',function(req,res){

	api.search(req.params.text,function(data){
				res.send(data);
			},req.params.limit||10,req.params.limit*req.params.page||0);
});

app.get('/api/song/:id',function(req,res){

	api.song(req.params.id,function(data){

		res.send(data);
		console.log(data);
	})

});
app.get('/api/lrc/:id',function(req,res){

	api.lrc(req.params.id,function(data){

		res.send(data);
		console.log(data);
	})

});
app.listen(80);
