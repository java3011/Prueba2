const express = require('express');
const router = express.Router();
const mysqlConnection = require('../connection/connection');
const jwt = require('jsonwebtoken');

router.get('/ListarPrescription',(req,res)=> {
    mysqlConnection.query('select * from prescription',(err,rows,fields)=> {
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })
});

router.post('/InsertPrescription', (req,res) => {
    mysqlConnection.query('insert into prescription(minPrescribedDose,maxPrescribedDose) values(?,?)',
    [req.body.minPrescribedDose,req.body.maxPrescribedDose],(err,respuesta) =>{
        if(err){
            console.log(err);
        }else{
            console.log(respuesta.rows);
            res.send(JSON.stringify({"status":"ok","item":respuesta.rows}));
        }
    })
})

module.exports = router;