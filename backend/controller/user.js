const con = require('../db/mysql')


const getCustomers = (req,res) =>{
    
    con.query('select * from user,customers where user.user_id = customers.cust_id',(err,results)=>{
        if(err) throw err;
        res.status(201).send(results);
    })

    
}

const getAgents = (req,res) =>{
    con.query('select * from user,deliverers where user.user_id = deliverers.deliv_id',(err,results)=>{
        if(err) throw err;
        res.status(201).send(results);
    })
}

module.exports = {getCustomers,getAgents}
