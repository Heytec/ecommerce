var router = require('express').Router();
var User = require('../models/user');
var passport =require ('passport');
var passportConf =require('../config/passport');
var flash = require('express-flash');
 var flash = require('flash');


router.get('/login', function(req,res){
      if(req.user) return res.redirect('/profile');
      res.render('accounts/login',{ message:req.flash('loginmessage')});

    });


router.post ('/login',passport.authenticate('local-login',{
          successRedirect:'/profile',
          failureRedirect: '/login',
          failureFlash : true
}));


router.get('/profile', function(req,res, next){
      User.findOne({ _id: req.user._id},function(err, user){
       if (err) return  next(err);
       res.render('accounts/profile',{user:user});
      });

})

    
  

router.get('/signup', function(req,res,next){
res.render('accounts/signup',{
    errors: req.flash('errors')
});

});






router.post('/signup', function(req,res,next){
    var user  = new User();

    user.profile.name =req.body.name;
    user.email= req.body.email;
    user.password= req.body.password;
   user.profile.picture=user.gravatar();

    User.findOne({email: req.body.email},function(err,existingUser){

         if(existingUser){
            
            req.flash('error', 'Account exist');
            
             return res.redirect('/signup');
         }else{

            user.save(function(err, user){
                if (err) return next(err);
               
                  req.login(user,function(err){
                      if(err) return next(err)
                    return res.redirect('/profile');
                  })  
               
            
            });


             
         }
         })
}) ;


router.get('/editprofile',function(req,res,next){
    res.render('accounts/editprofile.ejs',{ message: req.flash('success')});
});

router.post('/editprofile',function(req,res,next){
User.findOne({ _id: req.user._id},function(err,user){
      if(err) return next(err);
      if(req.body.name) user.profile.name=req.body.name;
      if(req.body.address) user.address =req.body.address;

      user.save(function(err){
          if (err)return next (err);
          req.flash('success', 'succesfullly edited');
          return res.redirect('/editprofile');
      });


});


});



router.get('/logout',function(req,res,next){
    req.logout();
    res.redirect('/');

});


module.exports =  router; 