const mysql=require('mysql2');
var con=mysql.createConnection({
    host:'localhost',
    database:'dbms',
   user:'root',
    password:'Sahil.395'
});
module.exports=con;