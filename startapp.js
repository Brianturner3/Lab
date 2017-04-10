var express = require("express");
var path = require("path");
var router = express.Router();
var app = express();
var fs = require('fs');
var homeObj = JSON.parse(fs.readFileSync('client/public/articles/home.json'));
var aboutObj = JSON.parse(fs.readFileSync('client/public/articles/about.json'));
var blogObj = JSON.parse(fs.readFileSync('client/public/articles/blog.json'));

app.set('views', path.join(__dirname,'client/views'));
app.set('view engine', 'pug');

//Define middleware, before defining routes

app.use("/",router);
app.use(express.static(path.join(__dirname, 'client/public')));

router.use(function(req,res,next){
	console.log("/" + req.method);
	next();
});


//Define all routes here

router.get("/",function(req,res){
	res.render('index', {articles: homeObj});
});

router.get("/about",function(req,res){
	res.render('about', {articles: aboutObj});	
});

router.get("/blog",function(req,res){
	res.render('blog', {articles: blogObj});
});


//Handle 404 Error
app.use("*",function(req,res){
	
});

var port = process.env.port || 8080;
app.listen(port,function(){
	console.log("Connected at Port 8080");
});
