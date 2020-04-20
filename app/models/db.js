const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

var connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

connection.connect((err) =>{
  if(err) throw err;
  console.log("mysql connected..");
connection.query("SELECT 1 + 1",(err,rows)=>{ /* */ });

connection.on('error',function(err){
  console.log("[mysql error]",err);
});
// keep connection alive
setInterval(function () {
  connection.query('SELECT 1');
  console.log('Keep alive the connection.');
}, 30000);
});



module.exports = connection;
