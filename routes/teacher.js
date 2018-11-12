const router = require("express").Router(),
      middleware = require("./../middleware/index"),
      passport = require("passport"),
      client = require("./../db/index");
      
router.get("/",(req,res)=>{
    res.render("teacher/login");
})
// router.post("/",(req,res)=>{
//     res.redirect("/teacher/"+req.body.username);
// })
// router.post("/",passport.authenticate("local",
// {
//     // successRedirect : "/projects",
//     failureRedirect : "/"
// }), function(req,res){
//     res.redirect("/teacher/"+req.body.usn)
// });

router.get("/new",(req,res)=>{
    res.render("teacher/new");
})

router.post("/new",(req,res)=>{
     const   name = req.body.name,
             usn = req.body.usn,
             branch = req.body.branch,
             email = req.body.email,
             phone = req.body.phone,
             password = req.body.password;
          
    const values = [name,usn,branch,email,phone,password];
    // console.log(values)
    const query = "insert into teacher(name,id,branch,email,phone,password) values($1,$2,$3,$4,$5,$6)";
    client.query(query,values,(err,result)=>{
        console.log("yo");
        if(err) {
            // console.log(err);
            req.flash("error",err.detail)
            res.redirect("/teacher/new");
        }
        else{ 
            // console.log("yo yo")
            passport.authenticate("local")(req,res,function(){
            // console.log("i am here")
            req.flash("success","welcome !!")
            res.redirect("/teacher/"+req.user.id);
        })
            }
            
    })
    
})

router.get("/:id",middleware.isLoggedIn ,(req,res)=>{
    const usn = req.params.id;
    const query = "select * from teacher where id =$1",
          values = [usn];
    client.query(query,values,(err,result)=>{
        if(err) res.redirect("/");
        else{
            client.query("select t.*, p.title, s.name from team t, project p, student s where (t.pid,t.usn) not in (select m.pid, m.usn from marks m where m.valued_by=$1) and p.pid=t.pid and t.usn=s.usn",[usn],function(err,team){
                if(err) console.log(err);
                else {
                    client.query("select m.*, s.name, p.title from marks m, project p, student s where m.pid=p.pid and m.usn=s.usn and m.valued_by=$1",[usn],(err,valued)=>{
                        if(err) console.log(err);
                        else res.render("teacher/show",{teacher : result.rows[0], team : team, valued : valued});
                    })
                }
            })
        }
            //   res.render("teacher/show",{teacher : result.rows[0]});
    })
})
router.get("/:id/edit", middleware.checkTeacher,(req,res)=>{
    const usn = req.params.id;
    const query = "select * from teacher where id =$1",
          values = [usn];
    client.query(query,values,(err,result)=>{
        if(err) res.redirect("/");
        else
              res.render("teacher/edit",{teacher : result.rows[0]});
    })
})
router.put("/:id",middleware.checkTeacher, (req,res)=>{
       const name = req.body.name,
              usn = req.params.id,
              branch = req.body.branch,
              email = req.body.email,
              phone = req.body.phone,
              password = req.body.password,
              query = "update teacher set branch = $1, name=$2, email=$3, phone=$4, password=$5 where id=$6",
              values = [branch,name,email,phone,password,usn];
      
      client.query(query,values,(err,result)=>{
          if(err) {
              req.flash("error",err.detail)
              res.redirect("/teacher");
          }
          else {
              req.flash("success","updated details")
              res.redirect("/teacher/"+req.params.id);
          }
      })
})




module.exports = router;