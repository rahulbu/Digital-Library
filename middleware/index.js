const db = require("./../db/index");

var middlewareStudent={};


middlewareStudent.isLoggedIn = function(req,res, next){
  if(req.isAuthenticated()) {
      return next();
  } else{
    // req.flash("error","you need to be logged in to proceed ...");
    res.redirect("/student/");
  }
};



module.exports = middlewareStudent;