var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
var request = require('request');
const nodemailer = require('nodemailer');
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/asteroidmail");

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'asteroidcustomers@gmail.com',
        pass: '251093ts'
    }
}); 
var mailSchema = new mongoose.Schema({
	mail:String,
	sent:Boolean
});

var Mailer = mongoose.model("Mail",mailSchema);
// BodyParser is used so i can parse the requests from pages
app.use(bodyParser.urlencoded({extended:true}));


//Telling express to serve the public directory 
app.use(express.static("public"));
//Choosing ejs as the default templating module
app.set("view engine", "ejs");


app.get("/", function(req, res)
{
	var request = require('request');
	request('https://api.nasa.gov/neo/rest/v1/feed?start_date=2017-04-08&api_key=iizOBB2NSo854gGGROd7txIHxRDLbnRupsJ8EGLG', function (error, response, body) { 
	if (!error && response.statusCode == 200) {
		var asteroids = JSON.parse(body);
  		res.render('home',{title:"Asteroid Security", asteroids:asteroids, greeting:" "});
  	} 
	});
});

app.get("/about/:id", function(req,res)
{
	var request = require('request');
	request('https://api.nasa.gov/neo/rest/v1/feed?start_date=2017-04-08&api_key=iizOBB2NSo854gGGROd7txIHxRDLbnRupsJ8EGLG', function (error, response, body) { 
	if (!error && response.statusCode == 200) {
		var asteroids = JSON.parse(body);
  		res.render('about',{title:"About Asteroid", asteroids:asteroids, id:req.params.id});
  	} 
	});
});

app.post("/mailall", function(req,res)
{
	Mailer.create({
		mail:req.body.mail,
		sent:false
	})
	var string = "<h4>Hey</h4> We found some new dangerous asteroids that will fly near earth in the next days: <br> Check them out!";
	let mailOptions = {
    from: '"Asteroid Security" <asteroidcustomers@gmail.com>', // sender address
    to:  req.body.mail , // list of receivers
    subject: 'A dengerous Asteroid', // Subject line
    text: 'A dengerous Asteroid', // plain text body
    html: string // html body
	};
	transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
	});
	console.log(req.body);
	res.redirect("/mailer")
});
app.get("/mailer",function(req,res)
{

	var request = require('request');
	request('https://api.nasa.gov/neo/rest/v1/feed?start_date=2017-04-08&api_key=iizOBB2NSo854gGGROd7txIHxRDLbnRupsJ8EGLG', function (error, response, body) { 
	if (!error && response.statusCode == 200) {
		var asteroids = JSON.parse(body);
  		res.render('home',{title:"Asteroid Security", asteroids:asteroids, greeting:"Thank you for subscribing!"});
  	} 
	});
})
app.listen(3000, function()
{
	console.log("server started at port  3000 !");
})