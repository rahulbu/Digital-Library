const router = require("express").Router();



router.get("/",(req,res)=>{
    res.render("login");
})
router.get("/:id",(req,res)=>{
    res.render("student/show");
})
router.get("/:id/edit",(req,res)=>{
    res.render("student/edit");
})

router.get("/new",(req,res)=>{
    res.render("student/new");
})


module.exports = router;