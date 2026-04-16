const express = require('express');
const cors = require('cors');
const db = require('./demodb');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Root Route
app.get('/', (req, res) => {
    res.send("<h1>Server is UP</h1><p>Try <a href='/api/players'>/api/players</a></p>");
});

// 2. The Players Route (The one that's failing)
app.get('/api/players', async (req, res) => {
    console.log("📢 Request received for /api/players"); // Watch your terminal for this!
    try {
        const [rows] = await db.query('SELECT * FROM `fut_draft_player`');
        res.json(rows);
    } catch (err) {
        console.error("❌ SQL Error:", err.message);
        res.status(500).json({ error: err.message });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`\n====================================`);
    console.log(`🚀 SERVER STARTED ON PORT ${PORT}`);
    console.log(`✅ ROUTE 1: http://localhost:${PORT}/`);
    console.log(`✅ ROUTE 2: http://localhost:${PORT}/api/players`);
    console.log(`====================================\n`);
});
