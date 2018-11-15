const db = require("./../db/index");

var middleware={};


middleware.isLoggedIn = function(req,res, next){
  if(req.isAuthenticated()) {
      return next();
  } else{
    // req.flash("error","you need to be logged in to proceed ...");
    req.flash("error","Login required !")
    res.redirect("/login");
  }
};

middleware.checkStudent = function(req,res,next){
  if(req.isAuthenticated()){
    if(req.user.type == "student"){
    db.query("select usn as id from student where usn = $1",[req.user.id],function(err,foundStudent){
      if(err){
        console.log("please login");
        req.flash("error","please login")
        res.redirect("/");
      } else{
       
        if(foundStudent.rows[0].id == req.user.id){
          next();
        } else {
          console.log("restricted access");
          req.flash("error","restricted access")
          res.redirect("back");
        }
      }
    });
  } else {
    console.log("not authenticated");
    req.flash("error","you're not authenticated")
    res.redirect("back");
  }
  } else {
    console.log("only students are authorized");
    req.flash("error","only students are authorized")
    res.redirect("back")
  }
}

middleware.checkTeacher = function(req,res,next){
  if(req.isAuthenticated()){
    if(req.user.type == "teacher"){
    db.query("select id from teacher where id = $1",[req.user.id],function(err,foundTeacher){
      if(err){
        console.log("please login");
        req.flash("error","please login")
        res.redirect("/login");
      } else{
        if(foundTeacher.rows[0].id == req.user.id){
          next();
        } else {
          req.flash("error","restricted access")
          console.log("restricted access");
          res.redirect("back");
        }
      }
    });
  } else {
    console.log("not authenticated");
    req.flash("error","not authenticated")
    res.redirect("back");
  }
  } else {
    req.flash("error","only teachers are authorized.")
    console.log("only teachers are authorised");
    res.redirect("back");
  }
}


module.exports = middleware;