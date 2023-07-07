var mysql = require('mysql');

//createConnection previously instead of createPool
var con = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "admin",
    database : 'myDB',
    multipleStatements: true
});

// var connectDB = ()=>{
//     con.connect(function(err) {
//         if (err) throw err;
//         console.log("Connected!");
//     });

//     return con;
// } 


module.exports = con;