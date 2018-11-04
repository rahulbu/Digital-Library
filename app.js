const express = require('express'),
      bodyParser = require('body-parser'),
      methodOverride = require('method-override'),
      passport = require('passport'),
      session = require('express-session'),
    //   passport = require('passport'),
    //   pgSession = require('connect-pg-simple')(session),
      helmet = require('helmet'),
      db = require('./db/index'),
      app = express();
      
const studentConfig = require('./middleware/studentConfig')(passport,db);

app.use(helmet());

const indexRoute = require("./routes/index"),
      projectRoute = require("./routes/project"),
      teacherRoute = require("./routes/teacher"),
      studentRoute = require("./routes/student");


app.use(bodyParser.urlencoded({extended :true}));
app.set("view engine","ejs");
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));
app.use(session({
    secret : "hola",
    resave : false,
    saveUninitialized : false
}))
app.use(passport.initialize())
app.use(passport.session())


app.use(function(req,res, next){
    res.locals.currentUser =req.user;
    // res.locals.error = req.flash("error");
    // res.locals.success = req.flash("success");
    next();
});

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