const con = require('../db/mysql')


const getOrders = (req,res) =>{
    
    con.query('select orders.order_id,user.username as customer,user.username as agent,orders.total,orders.address,orders.placed_date from orders,user where orders.cust_id = user.user_id',(err,results)=>{
        if(err) throw err;
        console.log(results)
        res.status(201).send(results);
    })

    
}

const getOrdersAgent = (req,res) => {
    con.query(`select orders.order_id,user.username as customer,orders.total,orders.address,orders.placed_date,delivers.status from orders,delivers,user where orders.cust_id = user.user_id and orders.order_id=delivers.order_id and delivers.deliv_id = ${req.params.id}`,(err,results)=>{
        if(err) throw err;
        res.status(201).send(results)
    })
}

const changeOrderStatus = (req,res) =>{
    con.query(`START TRANSACTION;UPDATE delivers SET status=1 where order_id = ${req.params.id};COMMIT;`,(err,result)=>{
        if(err) throw err;
        res.status(201).send("Changes Successfully")
    })
}

const getOrdersCustomer = (req,res) => {
    con.query(`START TRANSACTION;SELECT * from orders,delivers where orders.order_id = delivers.order_id and orders.cust_id = ${req.params.id};COMMIT;`,(err,results)=>{
        if(err) throw err;
        console.log(results);
        res.status(201).send(results);
    })

    // non conflicting transaction
}


module.exports = {getOrders,getOrdersAgent,changeOrderStatus,getOrdersCustomer}
