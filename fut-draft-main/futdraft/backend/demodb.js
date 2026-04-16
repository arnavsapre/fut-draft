const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: "localhost",
    user: "root",       // Default XAMPP user
    password: "",       // Default XAMPP password
    database: "csv_db 7", // Your new database name
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Testing the connection for your terminal
pool.getConnection()
    .then(connection => {
        console.log("✅ Successfully connected to: csv_db 7");
        connection.release();
    })
    .catch(err => {
        console.error("❌ Connection failed. Is MySQL running in XAMPP?");
        console.error("Error details:", err.message);
    });

module.exports = pool;