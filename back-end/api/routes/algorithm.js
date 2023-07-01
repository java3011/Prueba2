const express = require('express');
const router = express.Router();
const mysqlConnection = require('../connection/connection');
const jwt = require('jsonwebtoken');

router.get('/ListarAlgorithms',(req,res)=> {
    mysqlConnection.query('select * from algorithm',(err,rows,fields)=> {
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })
});

router.post('/InsertAlgorithm', (req,res) => {
    mysqlConnection.query('insert into algorithm(algorithmInfo,algorithmFile,algorithmName) values(?,?,?)',
    [req.body.algorithmInfo,req.body.algorithmFile,req.body.algorithmName],(err,respuesta) =>{
        if(err){
            console.log(err);
        }else{
            console.log(respuesta);
            res.send(JSON.stringify({"status":"ok","item":respuesta}));
        }
    })
})

module.exports = router;