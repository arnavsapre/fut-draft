const express = require('express');
const cors = require('cors');
const db = require('./demodb');
const app = express();

// Middleware
app.use(cors()); // Allows your React app to talk to this backend
app.use(express.json()); // Allows parsing of JSON data

// --- API ROUTES ---

// 1. Test Route: Check if the API and DB are working
app.get('/api/test', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT "Connection Successful" AS status');
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database connection failed' });
    }
});

// 2. Draft Route: Get players for the draft (Example)
app.get('/api/players', async (req, res) => {
    try {
        const [players] = await db.query('SELECT * FROM players LIMIT 5');
        res.json(players);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});