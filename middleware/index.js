const db = require("./../db/index");

var middlewareStudent={};


middlewareStudent.checkStudent = function(req,res,next){
    if(req.isAuthenticated()){
        db.query("")     
    }
}



module.exports = middlewareStudent;