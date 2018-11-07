const router = require("express").Router(),
      passport = require("passport"),
      middleware = require("./../middleware/index"),
      db = require("./../db/index");


router.post("/:pid",middleware.checkTeacher,(req,res)=>{
    const pid = req.body.pid,
          demo = req.body.demo,
          viva = req.body.viva,
          valued = req.body.valued,
          report = req.body.report,
          usn = req.body.usn;
    const values = [pid,usn,demo,report,viva,valued];
    const query = "insert into marks(pid,usn,demonstration,report,viva,valued_by) values($1,$2,$3,$4,$5,$6)";
    db.query(query,values,(err,result)=>{
        if(err){
            console.log(err);
            res.redirect("back");
        } else {
           res.redirect(req.get('referer'));
           // res.redirect("back")
        }
    })
})

router.put("/:pid",middleware.checkTeacher,(req,res)=>{
    const pid = req.body.pid,
          demo = req.body.demo,
          viva = req.body.viva,
          valued = req.body.valued,
          report = req.body.report,
          usn = req.body.usn;
    const values = [demo,report,viva,pid,usn,valued];
    const query = "update marks set demonstration = $1, report = $2, viva = $3 where pid = $4 and usn = $5 and valued_by = $6";
    db.query(query,values,(err,result)=>{
        if(err){
            console.log(err);
            res.redirect("back");
        } else {
           res.redirect(req.get('referer'));
           // res.redirect("back")
        }
    })
})

router.delete("/:pid", middleware.checkTeacher ,(req,res)=>{
    const pid = req.body.pid,
          valued = req.body.valued,
          usn = req.body.usn;
    const values = [pid,usn,valued];
    const query = "delete from marks where pid=$1 and usn=$2 and valued_by=$3";
    db.query(query,values,(err,result)=>{
        if(err){
            console.log(err);
            res.redirect("back");
        } else {
           res.redirect(req.get('referer'));
           // res.redirect("back")
        }
    })
})



module.exports = router;