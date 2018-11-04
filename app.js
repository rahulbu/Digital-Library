const express = require('express'),
      bodyParser = require('body-parser'),
      methodOverride = require('method-override'),
      helmet = require('helmet'),
      app = express();

app.use(helmet());

const indexRoute = require("./routes/index"),
      projectRoute = require("./routes/project"),
      teacherRoute = require("./routes/teacher"),
      studentRoute = require("./routes/student");


app.use(bodyParser.urlencoded({extended :true}));
app.set("view engine","ejs");
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));


app.use(indexRoute);
app.use("/teacher",teacherRoute);
app.use("/student",studentRoute);
app.use("/projects",projectRoute);

app.get('*',function(req,res){
    res.send("under construction");
})


app.listen(process.env.PORT , process.env.IP, ()=>{
    console.log("connected...");
})

// var DATABASE_URL="postgresql-opaque-90456";