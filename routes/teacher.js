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
            //  gender = req.body.gender,
             branch = req.body.branch,
             email = req.body.email,
             phone = req.body.phone,
             password = req.body.password;
            //  student = {
            //     name : name,
            //     usn : usn,
            //     gender : gender,
            //     branch : branch,
            //     email : email
            // };
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
            }// console.log(result.rows[0]);
            
    })
    
})

router.get("/:id",middleware.isLoggedIn ,(req,res)=>{
    
    res.render("teacher/show");
})
router.get("/:id/edit",(req,res)=>{
    res.render("teacher/edit");
})
// router.put("/:id",middleware.isLoggedIn, (req,res)=>{
//     res.redirect("/teacher/"+req.params.id);
// })


// router.post("/",(req,res)=>{
//     res.render("teacher/show");
// })


module.exports = router;