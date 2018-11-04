const router = require("express").Router();



router.get("/",(req,res)=>{
    res.render("student/login");
})
router.post("/",(res,req)=>{
    res.redirect("/student/"+req.body.username);
})

router.get("/new",(req,res)=>{
    res.render("student/new");
})

router.get("/:id",(req,res)=>{
    res.render("student/show");
})
router.get("/:id/edit",(req,res)=>{
    res.render("student/edit");
})
router.put("/:id",(req,res)=>{
    res.redirect("/student/"+req.params.id);
})


router.post("/",(req,res)=>{
    var name = req.body.name;
    var usn = req.body.usn;
    var gender = req.body.gender;
    var branch = req.body.branch;
    var email = req.body.email;
    var student = {
        name : name,
        usn : usn,
        gender : gender,
        branch : branch,
        email : email
    }
    res.render("student/show",{student : student});
})


module.exports = router;