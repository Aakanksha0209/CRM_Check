const {Router} =require('express');
const client=require('../db');
const cors=require('cors');
const router=Router();
const jwt=require('jsonwebtoken')
const crypto = require("crypto")
const auth=require('../Middlewares/auth');

router.get('/getUsers',(req,res)=>{
    client.query(`select * from login_data`,(error,result)=>{
        if(error){
            res.status(500).send(error);
        }else{
            res.status(200).json(result.rows);
        }
    })
});
router.get('/getCurrUser',auth,(req,res)=>{
    res.status(200).send(req.user);
});
router.get('/onlineUsers',(req,res)=>{
    client.query(`select * from login_data where isonline='1' and designation='0'`,(error,result)=>{
        if(error){
            res.status(500).send(error);
        }else{
            res.status(200).json(result.rowCount);
        }
    })
});
router.get('/onlineCustomerSupport',(req,res)=>{
    client.query(`select * from login_data where isonline='1' and designation='1'`,(error,result)=>{
        if(error){
            res.status(500).send(error);
        }else{
            res.status(200).json(result.rowCount);
        }
    })
});

router.post('/getUserByAuth',async(req,res)=>{
    const data=req.body;
    client.query(`select * from login_data where email='${data.email}' and password='${data.password}'`,(error,result)=>{
        if(error){
                   res.status(500).send(error);
        }else{
            if(result.rowCount){
                  const token=jwt.sign({name:result.rows[0].name,emp_id:result.rows[0].emp_id,email:result.rows[0].email,designation:result.rows[0].designation,contact_no:result.rows[0].contact_no},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'10d'});
            res.status(200).send({designation:result.rows[0].designation,token:token});
            }else{
                 res.status(200).send({token:null,designation:null});
            }

        }
    })
})
router.post('/addUser',(req,res)=>{
    const data=req.body;

    // const login_id = crypto.randomUUID()
    // res.send(data);
    client.query(`insert into login_data (name,emp_id,password,email,contact_no,designation,isonline) values('${data.name}','${data.emp_id}','${data.password}','${data.email}','${data.contact_no}','${data.designation}','0')`,(error,result)=>{
        if(error){
            res.status(500).send(error);
        }else{
            res.status(200).send(result);
        }
    })
})
router.put('/setOnlineStatus',(req,res)=>{
    const data=req.body;
    // res.send(data);
    client.query(`update login_data set isonline='${data.isonline}' where email='${data.email}'`,(error,result)=>{
        if(error){
            res.status(500).send(error);
        }else{
            res.status(200).send(result);
        }
    })
})


module.exports=router;