const router = require("express").Router(),
      passport = require("passport"),
      middleware = require("./../middleware/index"),
      db = require("./../db/index");


router.post("/:pid",middleware.checkStudent,(req,res)=>{
    const pid = req.body.pid,
          usn = req.body.usn;
    const values = [pid,usn];
    const query = "insert into team(pid,usn) values($1,$2)";
    db.query(query,values,(err,result)=>{
        if(err){
            console.log(err.detail);
            res.redirect("back");
        } else {
           res.redirect(req.get('referer'));
            // res.redirect("/projects/"+pid);
        }
    })
})

router.delete("/:pid", middleware.checkStudent ,(req,res)=>{
    const pid = req.body.pid,
          usn = req.body.usn;
    const values = [pid,usn];
    console.log(values);
    const query = "delete from team where pid=$1 and usn=$2";
    db.query(query,values,(err,result)=>{
        if(err){
            console.log(err);
            res.redirect("back");
        } else {
            console.log("deleted")
          res.redirect(req.get('referer'));
            // res.redirect("back")
        }
    })
})



module.exports = router;