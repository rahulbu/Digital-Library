const express = require('express'),
      app = express();
      

app.get('*',function(req,res){
    res.send("home page");
})


app.listen(process.env.PORT ||3000, process.env.IP, ()=>{
    console.log("connected...");
})