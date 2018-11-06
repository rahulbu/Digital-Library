const express = require('express'),
      bodyParser = require('body-parser'),
      methodOverride = require('method-override'),
      passport = require('passport'),
      session = require('express-session'),
      localStrategy = require('passport-local'),
    //   pgSession = require('connect-pg-simple')(session),
      helmet = require('helmet'),
      db = require('./db/index'),
      app = express();
      
//  const studentConfig = require('./middleware/studentConfig')(passport,db);

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
    // store: new (require('connect-pg-simple')(session))(),
    secret : "hola",
    resave : false,
    saveUninitialized : false,
    // cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }
}))
app.use(passport.initialize())
app.use(passport.session())
//require('./middleware/studentConfig')(passport,db);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
passport.use(new localStrategy({
    usernameField : 'usn',
    passwordField : 'password',
    // session : false
}, function(username,password,done){
    db.query('SELECT usn as id, name as username, password FROM student WHERE usn=$1', [username], function (err,student){
        if(err) return done(err);
        
        if(student.rows.length <= 0)// return done(null,false)
        {
            db.query('SELECT id, name as username, password FROM teacher WHERE id=$1', [username], function (err,teacher){
                if(err) return done(err);
                const second = teacher.rows[0];
                if(!second) return done(null,false);
                if(second.password!=password) return done(null,false);
                return done(null,second);
            })
        }
        else {
            const first = student.rows[0]
            if(first.password!=password) return done(null,false);
            return done(null,first);
        }
        
    })
  }
))
passport.serializeUser(function(user, done){
		done(null, user)
	})
passport.deserializeUser(function(user, done){
	db.query("SELECT usn as id, name as username, 'student' as type FROM student WHERE usn = $1", [user.id], (err, results) => {
		if(err) {
 			return done(err)
		}
		if(results.rows.length <= 0){
		    db.query("SELECT id, name as username, 'teacher' as type FROM teacher WHERE id = $1", [user.id], (error, ress) => {
                if(error) return done(err);
                done(null,ress.rows[0])
            })
		}
		else
		    done(null, results.rows[0]);
	})
})
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.use(function(req,res, next){
    res.locals.currentUser =req.user;
     console.log(req.user);
    // res.locals.error = req.flash("error");
    // res.locals.success = req.flash("success");
    next();
});

app.use(indexRoute);
app.use("/teacher",teacherRoute);
app.use("/student",studentRoute);
app.use("/projects",projectRoute);


app.get("/logout",function(req,res){
    req.logOut();
    res.redirect("/");
})

app.get('*',function(req,res){
    res.send("under construction");
})


app.listen(process.env.PORT , process.env.IP, ()=>{
    console.log("connected...");
})

// var DATABASE_URL="postgresql-opaque-90456";