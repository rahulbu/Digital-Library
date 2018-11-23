const router = require("express").Router(),
      middleware = require("./../middleware/index"),
      db = require("./../db/index"),
      path = require("path"),
      fileUpload = require("express-fileupload"),
      upload = require("fileupload").createFileUpload(path.join(__dirname+'/../reports'));
      
router.use(fileUpload());

router.get("/:pid",middleware.isLoggedIn,(req,res)=>{
    
    res.sendFile(path.join(__dirname,"/../reports/"+req.params.pid + "report.pdf"));
})

router.post("/:pid",middleware.checkStudent,(req,res)=>{
    const file = req.files.file;
    console.log(file.name);
    file.mv(path.join(__dirname,"/../reports",req.params.pid + "report.pdf"),(error)=>{
        if(error) {
            console.log(error);
            req.flash("error","File upload failed !");
            res.redirect("back");
        }
        else {
            req.flash("success","Report uploaded successfully !")
            // console.log("File uploaded");
            res.redirect("back");
        }
    })
    const reportPath = "/reports/"+req.params.pid + "report.pdf";
    db.query("update project set report=$1 where pid = $2",[reportPath,req.params.pid],(err,result)=>{
        if(err) console.log(err);
        else console.log("report updated in db")
    })
    // res.redirect("/projects/"+req.params.pid);
})

router.get("/:pid/delete",middleware.checkStudent,(req,res)=>{
    upload.delete(req.params.pid+'report.pdf',(error)=>{
        if(error) {
            req.flash("error","error !!")
            console.log (error);
            res.redirect("back");
        }
        else {
            console.log("file deleted")
            req.flash("success","Report removed successfully !")
            res.redirect("back");
        }
        // res.redirect("/");
    })
    db.query("update project set report=$1 where pid = $2",["",req.params.pid],(err,result)=>{
        if(err) console.log(err);
        else console.log("report updated in db")
    })
    // res.redirect("/projects/"+req.params.pid);
})


module.exports = router;