const express = require('express');
const router = express.Router();
const mysqlConnection = require('../connection/connection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.get('/',(req,res)=> {
    mysqlConnection.query('select * from users',(err,rows,fields)=> {
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })
});



            //const resp = bcrypt.compareSync( req.body.userPassword, userPassword);
            
router.post('/signin', (req,res) => {
    const {Email} = req.body;
    //const userPassword1 = bcrypt.hashSync(req.body.userPassword, "$2a$10$n6X0F1p88S/vLNbD9aR9Vu");
   //console.log(userPassword1);
    //const nuevo = bcrypt.compare(userPassword, req)
    mysqlConnection.query('select * from users where Email=?', [Email], (err,rows,fields) =>{
        
        if(!err){  
            if(rows.length >0){
                console.log(req.body.userPassword);
                if ( bcrypt.compare(req.body.userPassword, rows[0].userPassword)) {
                    res.json('Logueado');
                }else{
                    res.json('User not found');
                }
//                let data = JSON.stringify(rows[0]);
//                const token = jwt.sign(data, 'prueba1');
//                res.json({"token":token, "id":rows[0].idUser});
            }else{
               res.json('User not found');
            }
        }else{
            console.log(err);
        }
    })
})

router.post('/test',verifyToken,(req,res) =>{
    res.json('Informacion secreta');
})

function verifyToken(req,res,next){
    if(!req.headers.authorization) return res.status(401).json('No autorizado');

    const token = req.headers.authorization.substr(7);
    if(token !==''){
        const content = jwt.verify(token,'prueba1');
        req.data = content;
        next();
    }else{
        res.status(401).json('Token vacio');
    }
}

router.post('/InsertUser', (req,res) => {
    const salt = bcrypt.genSaltSync(10);
    const userPassword = bcrypt.hashSync(req.body.userPassword, salt);
    console.log(salt)
    mysqlConnection.query('insert into users(userName,Email,userPassword,Charge) values(?,?,?,?)',
    [req.body.userName,req.body.Email,userPassword,req.body.Charge],(err,respuesta) =>{
        if(err){
            console.log(err);
        }else{
            console.log(respuesta.rows);
            res.send(JSON.stringify({"status":"ok","item":res.rows}));
        }
    })
})

module.exports = router;