var mysql = require('mysql');
var con = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'partnersmg'
});
con.connect();
module.exports = con;
