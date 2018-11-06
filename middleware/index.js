const db = require("./../db/index");

var middleware={};


middleware.isLoggedIn = function(req,res, next){
  if(req.isAuthenticated()) {
      return next();
  } else{
    // req.flash("error","you need to be logged in to proceed ...");
    res.redirect("/");
  }
};

middleware.checkStudent = function(req,res,next){
  if(req.isAuthenticated()){
    if(req.user.type == "student"){
    db.query("select usn as id from student where usn = $1",[req.user.id],function(err,foundStudent){
      if(err){
        console.log("please login");
        res.redirect("/student");
      } else{
       
        if(foundStudent.rows[0].id == req.user.id){
          next();
        } else {
          console.log("restricted access");
          res.redirect("back");
        }
      }
    });
  } else {
    console.log("not authenticated");
    res.redirect("back");
  }
  } else {
    console.log("only students are authorized");
    res.redirect("back")
  }
}

middleware.checkTeacher = function(req,res,next){
  if(req.isAuthenticated()){
    if(req.user.type == "teacher"){
    db.query("select id from teacher where id = $1",[req.user.id],function(err,foundTeacher){
      if(err){
        console.log("please login");
        res.redirect("/teacher");
      } else{
        if(foundTeacher.rows[0].id == req.user.id){
          next();
        } else {
          console.log("restricted access");
          res.redirect("back");
        }
      }
    });
  } else {
    console.log("not authenticated");
    res.redirect("back");
  }
  } else {
    console.log("only teachers are authorised");
    res.redirect("back");
  }
}


module.exports = middleware;