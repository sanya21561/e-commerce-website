const con = require('../db/mysql')


const signup = (req,res) =>{
    
    console.log(req.body)

    con.query(`START TRANSACTION;Insert into user(fname,mname,lname,username,passw) values ('${req.body.fname}','${req.body.mname}','${req.body.lname}','${req.body.username}','${req.body.passw}');insert into customers(cust_id,r_ole,phone_numb,address) values (LAST_INSERT_ID(),'customer',${req.body.phone_numb},'${req.body.address}');INSERT INTO cart(cart_id,cust_id,total) where VALUES (LAST_INSERT_ID(),LAST_INSERT_ID(),2);COMMIT;`,(err,results)=>{
        if(err) throw err;
        console.log(results)
    })

    // conflicting transaction
    

    
}

module.exports = {signup}
