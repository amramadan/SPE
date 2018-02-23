// run using command nodemon server.js to run with server watcher
//to run db run this "C:\Program Files\MongoDB\Server\3.6\bin\mongod.exe" --dbpath "D:\downloads 2017\gits\task\meanDavidAcosta\mongo"
var express   = require('express');
var app       = express();
var port      = process.env.PORT || 3000;

//morgan is a module that logs out the HTTP request run with nodemon to see in cmd
var morgan    = require('morgan');

//mongodb a module for hooking-up mongodb with express
var mongoose  = require('mongoose');

//Importing users schema from ./app/models directory
var User       = require('./app/models/user');

//Import Body-Parser module to be able to parse post requests
var bodyParser = require('body-parser')

// parse various different custom JSON types as JSON
app.use(bodyParser.json());

//create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/tutorial', function(err) {
    if(err) {
        console.log("MongoDB Error: " + err);
    } else {
        console.log("MongoDB up and running");
    }
});

//using morgan dev is for colour coded responses easier to review
app.use(morgan('dev'));

//Incase I fucking forget how to make a get request for the millionth time
// app.get('/home', function(req,res){
//     res.send("My first get request");
// });

app.post('/users', function(req,res){
    var user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;
    user.save(function(err){
        if(!(user.username && user.password && user.email)) {
            //in case of missing entry ==> logic if any required input is sent in the request then the and expression will be false hence the not to make it true 
            res.send("Error: username, password or email are missing");
            
        }
        else if(err) {
            //in case of duplicates
            res.send("Error: username or email already exist");
        } else {
            res.send("User Created!");
        };
    });
});

app.listen(port, function() {
    console.log("Server running MEAN app on "+port);
});