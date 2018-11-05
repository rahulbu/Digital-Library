const router = require("express").Router(),
      passport = require("passport"),
      client = require("./../db/index");



router.get("/",(req,res)=>{
    res.render("student/login");
})
// router.post("/",(req,res)=>{
//     const usn = req.body.usn,
//           password = req.body.password;
//     const query = "select password from student where usn =$1",
//           values = [usn];
//     client.query(query,values,(err,result)=>{
//         if(err) res.redirect("/");
//         else{
//             console.log(result.rows[0]);
//             if(result.rows[0].password == password)
//                 res.redirect("/student/"+usn);
//             else res.redirect("/");
//         }
//     })
// })

router.post("/",passport.authenticate("local",
{
    // successRedirect : "/projects",
    failureRedirect : "/"
}), function(req,res){
    res.redirect("/student/"+req.body.usn)
});

router.get("/new",(req,res)=>{
    res.render("student/new");
})

router.get("/:id",(req,res)=>{
    const usn = req.params.id;
    const query = "select * from student where usn =$1",
          values = [usn];
    client.query(query,values,(err,result)=>{
        if(err) res.redirect("/");
        else
              res.render("student/show",{student : result.rows[0]});
    })
})
// router.post("/:id",(res,req)=>{
//     res.redirect("/student/"+req.body.username);
// })
router.get("/:id/edit",(req,res)=>{
    const usn = req.params.id,
          values = [usn];
    const query = "select * from student where usn = $1";
    client.query(query,values,(err,result)=>{
        if(err) res.redirect("/student");
        else res.render("student/edit",{row : result});
    })
})
router.put("/:id",(req,res)=>{
    const name = req.body.name,
      usn = req.params.id,
      gender = req.body.gender,
      branch = req.body.branch,
      email = req.body.email,
      phone = req.body.phone,
      password = req.body.password,
      query = "update table student set branch = $1, name=$2, gender=$3, email=$4, phone=$5, password=$6 where usn=$7",
      values = [branch,name,gender,email,phone,password,usn];
      
      client.query(query,values,(err,result)=>{
          if(err) res.redirect("/student");
          else res.redirect("/student/"+req.params.id);
      })
})


router.post("/new",(req,res)=>{
     const   name = req.body.name,
             usn = req.body.usn,
             gender = req.body.gender,
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
    const values = [name,usn,gender,branch,email,phone,password];
    const query = "insert into student(name,usn,gender,branch,email,phone,password) values($1,$2,$3,$4,$5,$6,$7) returning *";
    client.query(query,values,(err,result)=>{
        if(err) {
            console.log(err);
            res.redirect("/student/new");
        }
        else {
            // console.log(result.rows[0]);
            res.render("student/show",{student : result.rows});
        }
    })
    
})


router.get("/logout",function(req,res){
    req.logout();
    res.redirect("/");
})


module.exports = router;