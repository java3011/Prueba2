const express = require('express');
const router = express.Router();
const mysqlConnection = require('../connection/connection');
const jwt = require('jsonwebtoken');

router.get('/ListarIndexPrescription',(req,res)=> {
    mysqlConnection.query('select * from indexprescription',(err,resp,fields)=> {
        if(!err){
            res.json(resp);
        }else{
            console.log(err);
        }
    })
});

router.post('/InsertIndexPrescription', (req,res) => {
    mysqlConnection.query('insert into indexprescription(indexName) values(?)',
    [req.body.indexName],(err,respuesta) =>{
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
})

module.exports = router;