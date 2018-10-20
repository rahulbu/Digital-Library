const router = require("express").Router();

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  password: 'rahul',
  database:'DATABASE'
});

client.connect();

// client.query('SELECT * from demo', (err, res) => {
//   if (err) throw err;
//   for (let row of res.rows) {
//     console.log(JSON.stringify(row));
//   }
// //   client.end();
// });

router.get("/",(req,res)=>{
    client.query('SELECT * from demo', (err, result) => {
  if (err) throw err;
  else     res.render("index",{res : result});
//   for (let row of res.rows) {
//     console.log(JSON.stringify(row));
//   }
  client.end();
});
    // res.render("index");
})

module.exports = router;