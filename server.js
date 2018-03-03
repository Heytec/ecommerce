
 var express = require('express');
 var morgan = require('morgan');
 var mongoose = require ('mongoose');
 var bodyParser = require('body-parser');

 var User = require ('./models/user');
 
 var app= express();

 mongoose.connect ('mongodb://root:abc123@ds215208.mlab.com:15208/ecommerce', function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Connected to the database")
    }

 })


 
 app.use(morgan('dev'));
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended:true}));


 
 app.get('/',function(req, res ){
    
   res.json('my name is john ')

 });



 app.post('/create-user', function(req,res,next){
     var user  = new User();

     user.profile.name =req.body.name;
     user.password= req.body.password;
     user.email= req.body.email;

     user.save(function(err){
         if (err) return next(err);
         res.json("Succesfully created a new user ");
     });

 }) ;



 app.listen(3000, function(err){
     if (err) throw err;
     console.log('you are connected to the server ')

 })