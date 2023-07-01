const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '301199',
  database: 'Repository',
  port: '3307'
});

mysqlConnection.connect(err =>{
    if(err){
        console.log('Error en db: ', err);
        return;
    }else{
        console.log('DB OK');
    }
});

module.exports = mysqlConnection;