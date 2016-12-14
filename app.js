const express = require("express");
const app = express();
const api = require("neteaseMusicApi");
//const api2 = require("NeteaseCloudMusicApi").api;

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
//try{
    api.search(req.params.text,function(data){
        res.send(data);
        console.log('get search success  text:'+req.params.text);
    },req.params.limit||10,req.params.limit*req.params.page||0);
//} catch(e){

//}
});

app.get('/api/song/:id',function(req,res) {
//try{
    api.song(req.params.id, function (data) {

        res.send(data);
        console.log('get song success  id:' + req.params.id);
//	})
//}catch(e){

//}
    });
});
app.get('/api/lrc/:id',function(req,res){
//try{
    api.lrc(req.params.id,function(data){

        res.send(data);
        console.log('get lrc success  id:'+req.params.id);
    });
//}catch(e){

//}

});
app.get('/api/playlist/:id',function(req,res) {
//try{
    api.playlists(req.params.id, function (data) {
        res.send(data);
        console.log('get playlist success  id:' + req.params.id);
//    })
//}catch(e){}
    });
});
app.get('/api/userplaylist/:id',function(req,res){
//	try{
    api.userPlaylists(req.params.id,function(data){
        res.send(data);
        console.log(data);
        console.log('get userplaylist success  id:'+req.params.id);
    });
//    }catch(e){

//	}

});
console.log("running");
app.listen(80);
