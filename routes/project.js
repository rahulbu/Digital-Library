const router = require("express").Router(),
      middleware = require("./../middleware/index"),
      db = require("./../db/index") ;


// router.get("/",(req,res)=>{
//     res.render("projects/show");
// })
router.get("/",(req,res)=>{
    db.query('SELECT * from project', (err, result) => {
      if (err) console.log(err);
      else     
        res.render("projects/index",{res : result});
    });
})



router.get("/new",middleware.isLoggedIn ,(req,res)=>{
    res.render("projects/new");
})
router.post("/new",middleware.isLoggedIn,(req,res)=>{
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
  console.log(values);
  db.query(query,values,function(err,result){
    if(err) console.log(err);
    else res.redirect("/student/"+req.user.id);
  })
})

router.get("/:id",middleware.isLoggedIn,(req,res)=>{
    const id = req.params.id,
          values = [id],
          query = "select * from project where pid = $1";
    db.query(query,values,function(err,result){
      if(err) {
        console.log("no project");
        res.redirect("/projects");
      } else {
          db.query("select usn from team where pid = $1",values,function(err,row){
            if(err) console.log(err);
            else res.render("projects/show",{result : result.rows[0], team : row})
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
          console.log("wrong author")
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
  console.log(values);
  db.query(query,values,function(err,result){
    if(err) console.log(err);
    else res.redirect("/projects/"+req.params.id);
  })
})


module.exports = router;