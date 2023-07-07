const con = require('../db/mysql')


const getAllCategory = (req,res) =>{
    
    con.query('SELECT * FROM category;',(err,results)=>{
        if(err) throw err;
        res.status(201).send(results);
    })

    
}

module.exports = {getAllCategory}