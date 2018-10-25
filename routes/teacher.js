const router = require("express").Router();


router.get("/",(req,res)=>{
    res.render("login");
})
router.get("/:id",(req,res)=>{
    res.render("teacher/show");
})
router.get("/:id/edit",(req,res)=>{
    res.render("teacher/edit");
})

router.get("/new",(req,res)=>{
    res.render("teacher/new");
})


module.exports = router;