const express = require('express');
const router = express.Router();
const mysqlConnection = require('../connection/connection');
const jwt = require('jsonwebtoken');

router.get('/',(req,res)=> {
    mysqlConnection.query('select * from treatment',(err,rows,fields)=> {
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })
});

router.post('/InsertTreatment', (req,res) => {
    mysqlConnection.query('insert into treatment(treatmentInfo,numberOfBeams) values(?,?)',
    [req.body.treatmentInfo,req.body.numberOfBeams],(err,respuesta) =>{
        if(err){
            console.log(err);
        }else{
            console.log(respuesta.rows);
            res.send(JSON.stringify({"status":"ok","item":respuesta.rows}));
        }
    })
})

module.exports = router;