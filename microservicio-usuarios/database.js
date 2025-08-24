const sqlite3 = require('sqlite3').verbose();
const DBSOURCE = "users.db";
let db = new sqlite3.Database(DBSOURCE, (err) => {
 if (err) {
 // No se puede abrir la base de datos
 console.error(err.message);
 throw err;
 } else {
 console.log('Conectado a la base de datos SQLite.');
 db.run(`CREATE TABLE users (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 name TEXT NOT NULL,
 email TEXT UNIQUE NOT NULL,
 password TEXT NOT NULL,
 CONSTRAINT email_unique UNIQUE (email)
 )`,
 (err) => {
 if (err) {
     console.log('Ya se creo la base de datos');
 // La tabla ya ha sido creada
 }
 });
 }
});
module.exports = db;