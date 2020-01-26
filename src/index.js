/* eslint-disable consistent-return */
/**
 * title: index.js
 *
 * date: 1/26/2020
 *
 * author: Javier olaya
 *
 * description: this file solved problem 1 and 2 for the given exercise
 */

const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('./sqLite/aHistory3.db');

// PROB 1
// delete numbers that are not of type number.number.number
let sql = "DELETE FROM historicData WHERE ObjectNumber REGEXP '^[0-9.]*$' ";
db.all(sql, [], err => {
  if (err) {
    return console.error(err.message);
  }
});

console.log('created database');

// PROB 2
// create 2 new columns and add the new data to each columns using regex
sql = 'ALTER TABLE historicData ADD COLUMN ObjectStartDate TEXT';
db.all(sql, [], err => {
  if (err) {
    return console.error(err.message);
  }
});

sql = 'ALTER TABLE historicData ADD COLUMN ObjectEndDate TEXT';
db.all(sql, [], err => {
  if (err) {
    return console.error(err.message);
  }
});

sql =
  "UPDATE historicData SET ObjectStartDate = CASE WHEN ObjectDate REGEXP '^[^-|CA]*$' THEN (ObjectDate REGEXP '^[^-|CA]*$') ELSE CASE WHEN  ObjectDate REGEXP '^[0-9]{4}-' THEN (ObjectDate REGEXP '^[0-9]{4}-') ELSE WHEN ObjectDate REGEXP '-s[0-9]{4}' THEN (ObjectDate REGEXP '^[0-9]{4}-') ELSE CASE WHEN ObjectDate REGEXP 'Ca.s[0-9]{4}' THEN (ObjectDate REGEXP '[0-9]{4}' -3) ELSE ObjectDate END WHERE ObjectDate";
db.all(sql, [], err => {
  if (err) {
    return console.error(err.message);
  }
});

sql =
  "UPDATE historicData SET ObjectEndDate = CASE WHEN ObjectDate REGEXP '^[^-|CA]*$' THEN (ObjectDate REGEXP '^[^-|CA]*$') ELSE CASE WHEN  ObjectDate REGEXP '^[0-9]{4}-' THEN (ObjectDate REGEXP '-[0-9]{2}' + ObjectDate REGEXP '^[0-9]{4}') ELSE WHEN ObjectDate REGEXP '-s[0-9]{4}' THEN (ObjectDate REGEXP '[^d]d{4}s*$') ELSE CASE WHEN ObjectDate REGEXP 'Ca.s[0-9]{4}' THEN (ObjectDate REGEXP '[0-9]{4}') ELSE ObjectDate END WHERE ObjectDate";
db.all(sql, [], err => {
  if (err) {
    return console.error(err.message);
  }
});

// view all rows for the updated table
const viewDataSql = 'SELECT ObjectNumber,  Title FROM historicData';
db.all(viewDataSql, [], (err, row) => {
  if (err) {
    return console.error(err.message);
  }
  console.log(row);
});

// close the database connection
db.close();
