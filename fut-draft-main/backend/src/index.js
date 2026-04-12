require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const mysql = require('mysql2/promise'); // Uncomment when you are ready to connect MySQL

const app = express();
const PORT = process.env.PORT || 3000;

// --- Middleware ---
app.use(cors()); // Allows requests from your HTML/React frontend
app.use(express.json()); // Allows the server to understand JSON data sent in requests

// --- Database Connection (MySQL Setup Example) ---
/*
let db;
async function connectDB() {
  try {
    db = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'yourpassword',
      database: process.env.DB_NAME || 'fut_draft_db'
    });
    console.log('✅ Connected to MySQL Database!');
  } catch (error) {
    console.error('❌ Database connection error:', error);
  }
}
connectDB();
*/

// --- Routes ---

// 1. Basic Test Route
app.get('/', (req, res) => {
  res.send('Welcome to the FUT Draft Backend API (MySQL Ready)!');
});

// 2. Sample Data Route (Using an array before you use a real database)
let players = [
  { id: 1, name: "Lionel Messi", rating: 90, position: "RW" },
  { id: 2, name: "Kylian Mbappé", rating: 91, position: "ST" },
];

/* 
// Example of how a real MySQL route will look later:
app.get('/api/real_players', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM players');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
*/

// GET: Fetch all players (Array-based for now)
app.get('/api/players', (req, res) => {
  res.json(players);
});

// POST: Add a new player (Array-based for now)
app.post('/api/players', (req, res) => {
  const newPlayer = req.body;
  newPlayer.id = players.length + 1;
  players.push(newPlayer);
  
  res.status(201).json({ message: "Player added successfully", player: newPlayer });
});

// --- Start the Server ---
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
