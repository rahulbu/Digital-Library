const router = require("express").Router(),
      middleware = require("./../middleware/index"),
      db = require("./../db/index") ;


// router.get("/",(req,res)=>{
//     res.render("projects/show");
// })
router.get("/",(req,res)=>{
    db.query('SELECT * from project', (err, result) => {
      if (err) {
        // console.log(err);
        req.flash("error",err.detail);
        res.redirect("/");
      }
      else     
        res.render("projects/index",{res : result});
    });
})



router.get("/new",middleware.checkStudent ,(req,res)=>{
    res.render("projects/new");
})

router.post("/new",middleware.checkStudent,(req,res)=>{
  const lusn = req.body.lusn,
        title = req.body.title,
        description = req.body.description,
        details = { "github" : req.body.github,
                    "website" : req.body.website},
        report = req.body.report,
        supervision = req.body.supervision,
        area = req.body.area;
  const values = [lusn,title,description,details,report,supervision,area];
  const query = "insert into project(lusn,title,description,details,report,supervision,area) values($1,$2,$3,$4,$5,$6,$7)";
  // console.log(values);
  db.query(query,values,function(err,result){
    if(err) {
      // console.log(err);
        req.flash("error",err.detail);
        res.redirect("back");
    }
    else {
      req.flash("success","project added.")
      res.redirect("/student/"+req.user.id);
    }
  })
})

router.get("/:id",middleware.isLoggedIn,(req,res)=>{
    const id = req.params.id,
          values = [id],
          query = "select * from project where pid = $1";
    db.query(query,values,function(err,result){
      if(err) {
        // console.log("no project");
        req.flash("error","no project");
        res.redirect("/projects");
      } else {
          db.query("select * from team where pid = $1",values,function(err,row){
            if(err) console.log(err);
            else {
              db.query("select * from marks m where usn in (select usn from team t where t.pid=$1) and m.pid = $1 order by m.valued_by",values,function(err,marks){
                if(err) console.log(err);
                else res.render("projects/show",{result : result.rows[0], team : row, marks : marks})
              })
            }
          })
      }
    })
})

router.get("/:id/edit",middleware.checkStudent,(req,res)=>{
    const id = req.params.id,
          values = [id],
          query = "select * from project where pid = $1";
    db.query(query,values,function(err,result){
      if(err) console.log(err)
      else {
        if(result.rows[0].lusn != req.user.id){
          // console.log("wrong author")
          req.flash("error","you're not authorized")
          res.redirect("/projects/"+id);
        } else {
          res.render("projects/edit",{pro : result.rows[0]})
        }
      }
    })
    // res.render("projects/edit");
})
router.put("/:id",middleware.checkStudent, (req,res)=>{
  const title = req.body.title,
        description = req.body.description,
        details = { "github" : req.body.github,
                    "website" : req.body.website},
        report = req.body.report,
        supervision = req.body.supervision,
        pid = req.params.id,
        area = req.body.area;
  const values = [title,description,details,report,supervision,area,pid];
  const query = "update project set title=$1 , description=$2 , details=$3 ,report=$4 , supervision=$5 ,area=$6 where pid = $7";
  // console.log(values);
  db.query(query,values,function(err,result){
    if(err) {
      // console.log(err);
      req.flash("error",err.detail);
     res.redirect("back");
    }
    else {
      req.flash("success","project updated")
      res.redirect("/projects/"+req.params.id);
    }
  })
})


router.delete("/:id",middleware.checkStudent,(req,res)=>{
  const pid = req.body.pid;

    const values = [pid];
    // console.log(values);
    const query = "delete from project where pid=$1";
    db.query(query,values,(err,result)=>{
        if(err){
            // console.log(err.detail);
            req.flash("error",err.detail)
            res.redirect("back");
        } else {
            // console.log("deleted")
            req.flash("success","project deleted")
            res.redirect("/student/"+req.user.id);
        }
    })
})


module.exports = router;