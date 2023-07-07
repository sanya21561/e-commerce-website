const con = require('../db/mysql')


const Checkout = (req,res) =>{
    console.log(req.body)
    const today = new Date().toISOString().slice(0, 10);


    con.query(`INSERT INTO orders(cust_id, deliv_id, total, address, placed_date, payment, coup_id) VALUES ('${req.body.cust_id}', '94','${req.body.total}' , '${req.body.address}', '${today}', 'sit', '${req.body.coup_id}');`,(err,results)=>{
        if(err) throw err;
        console.log(results)

        const orderId = results.insertId;
        req.body.prod_ids.map((data)=>{
            con.query(`START TRANSACTION;INSERT INTO placed_products(order_id,cust_id,prod_id,total_cost) VALUES ('${orderId}',${req.body.cust_id},${data.prod_id},${data.price});update product set product.stock=product.stock-1 where prod_id=${data.prod_id};COMMIT;`,(err,results)=>{
                if(err) throw err;
            })
        })

        con.query(`INSERT INTO delivers(order_id,deliv_id,t_ime,status) VALUES ('${orderId}','94','${today}','0')`)
        res.status(201).send("Succesfully placed!");
    })

    
}

module.exports = {Checkout}