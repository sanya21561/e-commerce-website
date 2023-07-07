const con = require('../db/mysql')

const getAllOlaps = async (req, res) => {
  try {
    const results = await Promise.all([
      query('select category.cat_name, product.prod_name, sum(product.stock) as sum from category,product where product.cat_id = Category.cat_id group by category.cat_name, product.prod_name with rollup;'),
      query('select brand.brand_name, product.prod_name, sum(product.stock) as sum from brand,product where product.brand_id = brand.brand_id group by brand.brand_name, product.prod_name with rollup;'),
      query('select orders.cust_id, count(orders.order_id) from orders group by orders.cust_id with rollup;'),
      query('select orders.order_id,orders.cust_id, sum(orders.total) from orders group by orders.cust_id,orders.order_id with rollup;')
    ])
    
    res.status(201).send(results)
  } catch (err) {
    console.error(err)
    res.status(500).send('Server Error')
  }
}

const query = (sql) => {
  return new Promise((resolve, reject) => {
    con.query(sql, (err, results) => {
      if (err) {
        reject(err)
      } else {
        resolve(results)
      }
    })
  })
}

module.exports = { getAllOlaps }
