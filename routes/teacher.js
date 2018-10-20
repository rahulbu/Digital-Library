const router = require("express").Router();


router.get("/",(req,res)=>{
    res.send("teacher page")
})



module.exports = router;