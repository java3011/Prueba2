const express = require('express');
const router = express.Router();
const mysqlConnection = require('../connection/connection');
const jwt = require('jsonwebtoken');

router.get('/ListarOrganCase',(req,res)=> {
    mysqlConnection.query('select * from organcase',(err,resp,fields)=> {
        if(!err){
            res.json(resp);
        }else{
            console.log(err);
        }
    })
});

router.post('/InsertOrganCase', (req,res) => {
    mysqlConnection.query('insert into organcase(numberOfVoxels,Volume) values(?,?)',
    [req.body.numberOfVoxels,req.body.Volume],(err,respuesta) =>{
        if(err){
            console.log(err);
        }else{
            console.log(respuesta.rows);
            res.send(JSON.stringify({"status":"ok","item":respuesta.rows}));
        }
    })
})

module.exports = router;