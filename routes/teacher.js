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
router.post("/",passport.authenticate("local",
{
    // successRedirect : "/projects",
    failureRedirect : "/"
}), function(req,res){
    res.redirect("/teacher/"+req.body.usn)
});

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
    console.log(values)
    const query = "insert into teacher(name,id,branch,email,phone,password) values($1,$2,$3,$4,$5,$6)";
    client.query(query,values,(err,result)=>{
        console.log("yo");
        if(err) {
            console.log(err);
            res.redirect("/teacher/new");
        }
        else{ console.log("yo yo")
            passport.authenticate("local")(req,res,function(){
            console.log("i am here")
            res.render("teacher/show",{teacher : result.rows[0]});
        })
            }
            
    })
    
})

router.get("/:id",middleware.checkTeacher ,(req,res)=>{
    const usn = req.params.id;
    const query = "select * from teacher where id =$1",
          values = [usn];
    client.query(query,values,(err,result)=>{
        if(err) res.redirect("/");
        else
              res.render("teacher/show",{teacher : result.rows[0]});
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
          if(err) res.redirect("/teacher");
          else res.redirect("/teacher/"+req.params.id);
      })
})




module.exports = router;