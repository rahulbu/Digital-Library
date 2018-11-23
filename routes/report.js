const router = require("express").Router(),
      middleware = require("./../middleware/index"),
      db = require("./../db/index"),
      path = require("path"),
      fileUpload = require("express-fileupload"),
      upload = require("fileupload").createFileUpload(path.join(__dirname+'/../reports'));
      
router.use(fileUpload());

router.get("/:pid",(req,res)=>{
    
    res.sendFile(path.join(__dirname,"/../reports/"+req.params.pid + "report.pdf"));
})

router.post("/:pid",(req,res)=>{
    const file = req.files.file;
    console.log(file.name);
    file.mv(path.join(__dirname,"/../reports",req.params.pid + "report.pdf"),(error)=>{
        if(error) console.log(error);
        else console.log("file uploaded");
    })
    const reportPath = "/reports/"+req.params.pid + "report.pdf";
    db.query("update project set report=$1 where pid = $2",[reportPath,req.params.pid],(err,result)=>{
        if(err) console.log(err);
        else console.log("report updated in db")
    })
    res.redirect("back");
})

router.get("/:pid/delete",(req,res)=>{
    upload.delete(req.params.pid+'report.pdf',(error)=>{
        if(error) console.log (error);
        else console.log("file deleted")
        // res.redirect("/");
    })
    db.query("update project set report=$1 where pid = $2",["",req.params.pid],(err,result)=>{
        if(err) console.log(err);
        else console.log("report updated in db")
    })
    res.redirect("back");
})


module.exports = router;