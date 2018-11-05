// const bcrypt = require('bcrypt');
// const winston = require('winston');
// const LocalStrategy = require('passport-local').Strategy;

// // const db = require("./../db/index");

// module.exports = (passport, db) => {
// 	passport.use(new LocalStrategy((usn, password, cb) => {
// 		db.query('SELECT usn as id, name as username, password FROM student WHERE usn=$1', [usn], (err, result) => {
// 			if(err) {
// 				winston.error('Error when selecting student user on login', err)
// 				console.log("error in studentConfig")
// 				return cb(err)
// 			}

// 			if(result.rows.length > 0) {
// 				console.log("all set in SA")
// 				const first = result.rows[0]
// 				// bcrypt.compare(password, first.password, function(err, res) {
// 				//     if(err) console.log("error from studentAuth");
// 				// 	if(res) {
// 				// 		cb(null, { id: first.id, username: first.username })
// 				// 	} else {
// 				// 		cb(null, false)
// 				// 	}
// 				// })
// 				if(password==first.password){
// 					cb(null, { id: first.id, username: first.username })
// 				}else{
// 					cb(null, false)
// 				}
				
// 			} 
// 			else {
// 				cb(null, false)
// 			}
// 		})
// 	}))

// 	passport.serializeUser((user, done) => {
// 		done(null, user.id)
// 	})

// 	passport.deserializeUser((usn, cb) => {
// 		db.query('SELECT usn as id, name as username FROM student WHERE usn = $1', [usn], (err, results) => {
// 			if(err) {
// 				winston.error('Error when selecting student user on session deserialize', err)
// 				return cb(err)
// 			}

// 			cb(null, results.rows[0])
// 		})
// 	})
// }