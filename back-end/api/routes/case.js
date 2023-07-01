const express = require('express');
const router = express.Router();
const mysqlConnection = require('../connection/connection');
const jwt = require('jsonwebtoken');

router.get('/',(req,res)=> {
    mysqlConnection.query('select * from cases',(err,rows,fields)=> {
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })
});

router.post('/InsertCase', (req,res) => {
    mysqlConnection.query('insert into cases(caseName,dataCase,Noncoplanar) values(?,?,?)',
    [req.body.caseName,req.body.dataCase,req.body.Noncoplanar],(err,respuesta) =>{
        if(err){
            console.log(err);
        }else{
            console.log(respuesta.rows);
            res.send(JSON.stringify({"status":"ok","item":respuesta.rows}));
        }
    })
    mysqlConnection.query('insert into typeofcancer(cancerName,cancerDescription) values(?,?)',
    [req.body.cancerName,req.body.cancerDescription],(err,respuesta) =>{
        if(err){
            console.log(err);
        }
        // else{
        //     console.log(respuesta.rows);
        //     res.send(JSON.stringify({"status":"ok","item":respuesta.rows}));
        // }
    })
})

router.get('/GetAll',(req,res)=>{
    let caseName = new RegExp(`.*${req.query.searchB || ''} .*`);
    CaseModel.find({name: caseName})
    .populate('caseName')
    .exec()
    .then((cases) => res.send(cases))
    .catch(
        (error) => {
            res.status(500).send({
                message: error.mensagge
            })
        }
    )
})

module.exports = router;