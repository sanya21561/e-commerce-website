const con = require('../db/mysql')


const login= (req,res) =>{
    
    console.log(req.body)

    con.query(`select * from user,customers,deliverers where user.user_id = customers.cust_id and user.username='${req.body.username}' and user.passw=${req.body.passw}`,(err,results)=>{
        if(err) throw err;
        if(results.length===0){
            
            con.query(`select * from user,deliverers where user.user_id = deliverers.deliv_id and user.username='${req.body.username}' and user.passw=${req.body.passw}`,(err,result)=>{
                if(err) throw err;
                console.log(result)
                res.send(result)
            })
        }else{
            res.send(results)
        }
        
        
    })

}

const getAddressLogin = (req,res) =>{
    con.query(`START TRANSACTION;select address from user,customers where user.user_id = customers.cust_id and user.user_id = ${req.params.id}`,(err,results)=>{
        if(err) throw err;
        res.send(results)
    })
}

module.exports = {login,getAddressLogin}
