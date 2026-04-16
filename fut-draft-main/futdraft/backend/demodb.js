const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "csv_db 6", // The name of the cylinder icon in phpMyAdmin
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection()
    .then(connection => {
        console.log("✅ Connected to MySQL Database: csv_db 6");
        connection.release();
    })
    .catch(err => {
        console.error("❌ Database connection failed:", err.message);
    });


module.exports = pool;