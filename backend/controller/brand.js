const con = require('../db/mysql')


const getAllBrand = (req,res) =>{
    
    con.query('SELECT * FROM brand;',(err,results)=>{
        if(err) throw err;
        res.status(201).send(results);
    })

    
}

module.exports = {getAllBrand}
