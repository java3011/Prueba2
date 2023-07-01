const express = require('express');
const router = express.Router();
const mysqlConnection = require('../connection/connection');
const jwt = require('jsonwebtoken');

router.get('/',(req,res)=> {
    mysqlConnection.query('select * from algorithm',(err,rows,fields)=> {
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })
});

router.post('/InsertAlgorithm', (req,res) => {
    mysqlConnection.query('insert into algorithm(algorithmInfo,algorithmFile) values(?,?)',
    [req.body.algorithmInfo,req.body.algorithmFile],(err,respuesta) =>{
        if(err){
            console.log(err);
        }else{
            console.log(respuesta.rows);
            res.send(JSON.stringify({"status":"ok","item":respuesta.rows}));
        }
    })
})

module.exports = router;