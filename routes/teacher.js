const router = require("express").Router();


router.get("/",(req,res)=>{
    res.render("teacher/login");
})
router.post("/",(req,res)=>{
    res.redirect("/teacher/"+req.body.username);
})
router.get("/new",(req,res)=>{
    res.render("teacher/new");
})

router.get("/:id",(req,res)=>{
    res.render("teacher/show");
})
router.get("/:id/edit",(req,res)=>{
    res.render("teacher/edit");
})
router.put("/:id",(req,res)=>{
    res.redirect("/teacher/"+req.params.id);
})

router.post("/",(req,res)=>{
    res.render("teacher/show");
})


module.exports = router;