const express = require('express');
const router = express.Router();
const mysqlConnection = require('../connection/connection');
const jwt = require('jsonwebtoken');

router.get('/ListarOrgan',(req,res)=> {
    mysqlConnection.query('select * from organ',(err,resp,fields)=> {
        if(!err){
            res.json(resp);
        }else{
            console.log(err);
        }
    })
});

router.post('/InsertOrgan', (req,res) => {
    mysqlConnection.query('insert into organ(organName,organType) values(?,?)',
    [req.body.organName,req.body.organType],(err,respuesta) =>{
        if(err){
            console.log(err);
        }else{
            console.log(respuesta.rows);
            res.send(JSON.stringify({"status":"ok","item":respuesta.rows}));
        }
    
    })
    mysqlConnection.query('insert into organcase(numberOfVoxels,Volume) values(?,?)',
    [req.body.numberOfVoxels,req.body.Volume],(err,respuesta) =>{
        if(err){
            console.log(err);
        }
    })
    mysqlConnection.query('insert into prescription(minPrescribedDose,maxPrescribedDose) values(?,?)',
    [req.body.minPrescribedDose,req.body.maxPrescribedDose],(err,respuesta) =>{
        if(err){
            console.log(err);
        }
    })
    mysqlConnection.query('insert into indexprescription(indexName) values(?)',
    [req.body.indexName],(err,respuesta) =>{
        if(err){
            console.log(err);
        }
    })
})

module.exports = router;