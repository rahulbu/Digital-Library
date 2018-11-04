const router = require("express").Router();

// const { Client } = require('pg');

// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
//   password: 'rahul',
//   database:'dbms',
//   ssl: true,
// });

// client.connect();

// router.get("/psql",(req,res)=>{
//     client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, result) => {
//   if (err) throw err;
//     res.render("index",{res : result});

// });
// })
// // client.query('SELECT * from demo', (err, res) => {
//   if (err) throw err;
//   for (let row of res.rows) {
//     console.log(JSON.stringify(row));
//   }
// //   client.end();
// });

router.get("/",(req,res)=>{
  //   client.query('SELECT * from project', (err, result) => {
  // if (err) throw err;
  // else     
  res.render("index");
//   for (let row of res.rows) {
//     console.log(JSON.stringify(row));
//   }
  //client.end();
});
    // res.render("index");
// })


/////////////////////////////////////////////////////////////////////////////////
// const { Client } = require('pg');

// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: true,
// });

// client.connect();
// router.get("/",function(req,res){
//     client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
//   if (err) throw err;
//   for (let row of res.rows) {
//     console.log(JSON.stringify(row));
//   }
//   client.end();
// });

// })

/////////////////////////////////////////////////////////////////////////////////////

// router.get("/login",(req,res)=>{
//   res.render("login");
// })

// router.get("/register",(req,res)=>{
//   res.render("register");
// })

module.exports = router;

// sudo service postgresql start