'use strict';

var fs = require('fs');
var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var shortid = require('shortid');
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$&');
var validUrl = require('valid-url');
var cors = require('cors');

var app = express();
var MongoClient = mongo.MongoClient();
// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
//mongoose.connect(process.env.MONGO_URI);

app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here

app.use('/public', express.static(process.cwd() + '/public'));

/*app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});*/

app.route('/_api/package.json')
  .get(function(req, res, next) {
    console.log('requested');
    fs.readFile(__dirname + '/package.json', function(err, data) {
      if(err) return next(err);
      res.type('txt').send(data.toString());
    });
  });
  
app.route('/')
    .get(function(req, res) {
		  res.sendFile(process.cwd() + '/views/index.html');
    });

app.route('/new/:url(*)')
    .get( (req,res, next) => {
  //connect to database
  MongoClient.connect(process.env.MONGO_URL, (err, db) => {
        if (err) {
          console.log("Unable to connect to server", err);
        } else {
          //console.log("Connected to server");
          let collection = db.collection('links');
          let url = req.params.url;
          let host = req.get('host') + "/"
          
          //function to generate short link 
          let generateLink = function(db, callback) {
            //check if url is valid
            if (validUrl.isUri(url)){
              collection.findOne({"url": url}, {"short": 1, "_id": 0}, (err, doc) =>{
                if(doc != null){
                  res.json({
                  "original_url": url, 
                  "short_url":host + doc.short
                });
                }
                else{
                   //generate a short code
                    let shortCode = shortid.generate();
                    let newUrl = { url: url, short: shortCode };
                    collection.insert([newUrl]);
                      res.json({
                        "original_url":url, 
                        "short_url":host + shortCode
                      });
                }
              });
            } 
            else {
                console.log('Not a URI');
                res.json({
                  "error": "Invalid url"
                })
            }
          };
          
          generateLink(db, function(){
            db.close();
          });
        }
  }); 
});

//given short url redirect to original url
app.route('/:short')
    .get( (req,res, next) => {
  MongoClient.connect(process.env.MONGO_URI, (err,db) => {
    if (err) {
          console.log("Unable to connect to server", err);
        } else {
          let collection = db.collection('links');
          let short = req.params.short;
          
          //search for original url in db and redirect the browser
          collection.findOne({"short": short}, {"url": 1, "_id": 0}, (err, doc) => {
            if (doc != null) {
              res.redirect(doc.url);
            } else {
              res.json({ error: "Shortlink not found in the database." });
            };
          });
        }
    db.close();
  });
});

// Respond not found to all the wrong routes
app.use(function(req, res, next){
  res.status(404);
  res.type('txt').send('Not found');
});

// Error Middleware
app.use(function(err, req, res, next) {
  if(err) {
    res.status(err.status || 500)
      .type('txt')
      .send(err.message || 'SERVER ERROR');
  }  
})


app.listen(port, function () {
  console.log('Node.js listening ...');
});
