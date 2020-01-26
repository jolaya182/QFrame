/* eslint-disable consistent-return */
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('./sqLite/aHistory3.db');

// db.serialize(()=>{

// });

const sql = 'SELECT ObjectNumber,  Title FROM historicData';
db.all(sql, [], (err, row) => {
  if (err) {
    return console.error(err.message);
  }
  console.log(row);
});

console.log('created database');

// close the database connection
db.close();
