/* eslint-disable consistent-return */
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('./sqLite/aHistory3.db');

// db.serialize(()=>{

// });

// const viewDataSql = 'SELECT ObjectNumber,  Title FROM historicData';
// db.all(viewDataSql, [], (err, row) => {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log(row);
// });

// PROB 1
// delete numbers that are not of type number.number.number
let sql = "DELETE FROM historicData WHERE ObjectNumber REGEXP '^[0-9.]*$' ";
db.all(sql, [], (err, row) => {
  if (err) {
    return console.error(err.message);
  }
  console.log(row);
});

console.log('created database');

// PROB 2
// create 2 new columns
sql = 'ALTER TABLE historicData ADD COLUMN ObjectStartDate TEXT';
db.all(sql, [], (err, row) => {
  if (err) {
    return console.error(err.message);
  }
  console.log(row);
});

sql = 'ALTER TABLE historicData ADD COLUMN ObjectEndDate TEXT';
db.all(sql, [], (err, row) => {
  if (err) {
    return console.error(err.message);
  }
  console.log(row);
});

sql =
  "UPDATE historicData SET ObjectStartDate = CASE WHEN ObjectDate REGEXP '^[^-|CA]*$' THEN (ObjectDate REGEXP '^[^-|CA]*$') ELSE CASE WHEN  ObjectDate REGEXP '^[0-9]{4}-' THEN (ObjectDate REGEXP '^[0-9]{4}-') ELSE WHEN ObjectDate REGEXP '-s[0-9]{4}' THEN (ObjectDate REGEXP '^[0-9]{4}-') ELSE CASE WHEN ObjectDate REGEXP 'Ca.s[0-9]{4}' THEN (ObjectDate REGEXP '[0-9]{4}' -3) ELSE ObjectDate END WHERE ObjectDate";
db.all(sql, [], (err, row) => {
  if (err) {
    return console.error(err.message);
  }
  console.log(row);
});

sql =
  "UPDATE historicData SET ObjectEndDate = CASE WHEN ObjectDate REGEXP '^[^-|CA]*$' THEN (ObjectDate REGEXP '^[^-|CA]*$') ELSE CASE WHEN  ObjectDate REGEXP '^[0-9]{4}-' THEN (ObjectDate REGEXP '-[0-9]{2}' + ObjectDate REGEXP '^[0-9]{4}') ELSE WHEN ObjectDate REGEXP '-s[0-9]{4}' THEN (ObjectDate REGEXP '[^d]d{4}s*$') ELSE CASE WHEN ObjectDate REGEXP 'Ca.s[0-9]{4}' THEN (ObjectDate REGEXP '[0-9]{4}') ELSE ObjectDate END WHERE ObjectDate";
db.all(sql, [], (err, row) => {
  if (err) {
    return console.error(err.message);
  }
  console.log(row);
});
// close the database connection
db.close();
