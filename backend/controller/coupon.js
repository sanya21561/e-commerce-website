const con = require('../db/mysql')


const getAllCoupon = (req,res) =>{
    
    con.query(`select * from has_coupon natural join coupon where cust_id=${req.body.user_id}`,(err,results)=>{
        if(err) throw err;
        res.status(201).send(results);
    })

    
}

const removeCoupon = (req,res) => {
    con.query(`delete from has_coupon where has_coupon.cust_id = ${req.body.user_id} and has_coupon.coup_id=${req.body.coup_id};`,(err,results)=>{
        if(err) throw err;
        res.status(201).send(results);
    })

}


module.exports = {getAllCoupon,removeCoupon}
