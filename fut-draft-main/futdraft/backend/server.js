const express = require('express');
const cors = require('cors');
const db = require('./demodb'); // This imports your MySQL connection

const app = express();
app.use(cors());
app.use(express.json());

// 1. The "Front Door" - This is what you see now!
app.get('/', (req, res) => {
    res.send("<h1>IF YOU SEE THIS, THE SERVER IS FINALLY WORKING!</h1><p>Check your player data at: <a href='/api/players'>/api/players</a></p>");
});

// 2. The "Data Room" - This pulls from your CSV table
app.get('/api/players', async (req, res) => {
    try {
        // Using backticks for the table name helps avoid syntax errors
        const [rows] = await db.query('SELECT * FROM `fifa_players`');
        res.json(rows);
    } catch (err) {
        console.error("DB Error:", err);
        res.status(500).json({
            error: "Database Fetch Failed",
            message: err.message
        });
    }
});

app.listen(5000, () => {
    console.log("🚀 Server is fully loaded on http://localhost:5000");
});