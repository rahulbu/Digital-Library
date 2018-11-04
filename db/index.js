const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  password: 'rahul',
  database:'dbms',
//   ssl: true,
});

client.connect((err)=>{
    if(err) console.log("error in connection!");
    else console.log("connected todatabase server ...");
});

module.exports = client;


// const { Pool } = require('pg')

// const pool = new Pool({
//     connectionString: process.env.DATABASE_URL,
//     password: 'rahul',
//     database:'dbms',
// })

// module.exports = {
//   query: (text, params, callback) => {
//     return pool.query(text, params, callback)
//   }
// }





