const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the current directory (where index.html is located)
app.use(express.static(path.join(__dirname)));

// Initialize SQLite database
const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    // Create leads table if it doesn't exist
    db.run(`CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT NOT NULL,
      enterprise_email TEXT NOT NULL,
      architecture_scope TEXT NOT NULL,
      requirements_text TEXT NOT NULL,
      submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      status TEXT DEFAULT 'pending'
    )`);
  }
});

// API Endpoint to handle contact form submissions
app.post('/api/contact', (req, res) => {
  const { name, email, 'project-type': projectType, message } = req.body;

  if (!name || !email || !projectType || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const sql = `INSERT INTO leads (full_name, enterprise_email, architecture_scope, requirements_text) VALUES (?, ?, ?, ?)`;
  
  db.run(sql, [name, email, projectType, message], function(err) {
    if (err) {
      console.error('Error inserting lead:', err.message);
      return res.status(500).json({ error: 'Internal server error' });
    }
    console.log(`A lead has been inserted with rowid ${this.lastID}`);
    res.status(201).json({ success: true, message: 'Architecture request submitted successfully', leadId: this.lastID });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
