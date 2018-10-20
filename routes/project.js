const router = require("express").Router();


router.get("/",(req,res)=>{
    res.render("projects/show");
})
// router.get("/:id/edit",(req,res)=>{
//     res.render("teacher/edit");
// })

// router.get("/new",(req,res)=>{
//     res.render("teacher/new");
// })


module.exports = router;