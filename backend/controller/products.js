const con = require('../db/mysql')


const getAllProducts = (req,res) =>{
    
    con.query('SELECT * FROM product;',(err,results)=>{
        if(err) throw err;
        res.status(201).send(results);
    })

    
}

const deleteProduct = (req,res) => {
    const productId = req.params.id;
    const sql = `START TRANSACTION;DELETE FROM wish_contains where prod_id=${productId} ;DELETE FROM inventory_store where prod_id=${productId} ;DELETE FROM cart_contains WHERE prod_id ='${productId}';DELETE FROM belongs_to WHERE prod_id = '${productId}';DELETE FROM product WHERE prod_id = '${productId}';COMMIT;`;
    con.query(sql,(err,results)=>{
        if(err) throw err;
        res.status(201).send("Deleted Successfully")
    })

    // non conflicting transaction
}


const addProduct = (req,res) => {
    const sql = `START TRANSACTION;INSERT INTO product(cat_id,brand_id,stock,price,prod_desc,prod_name) VALUES (${req.body.cat_id},${req.body.brand_id},${req.body.stock},${req.body.price},'${req.body.prod_desc}','${req.body.prod_name}');INSERT INTO belongs_to(prod_id,cat_id,brand_id) VALUES (LAST_INSERT_ID(),${req.body.cat_id},${req.body.brand_id});INSERT INTO inventory_store(prod_id,invent_id) VALUES (LAST_INSERT_ID(),${req.body.invent_id});COMMIT;`
    con.query(sql,(err,results)=>{
        if(err) throw err;
        res.status(201).send("Added Successfully")
    })

    // non conflicting transaction
}

module.exports = {getAllProducts,deleteProduct,addProduct}