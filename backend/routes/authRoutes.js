'use strict';

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const router = express.Router();
const logger = require('some-logging-library'); // Replace with an actual logging library

const pool = new Pool({
  user: 'your_db_user',
  host: 'localhost',
  database: 'your_database_name',
  password: 'your_db_password',
  port: 5432,
});

// Middleware to authenticate token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send("Token is required!");

  jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
    if (err) return res.status(401).send("Unauthorized!");
    req.userId = decoded.id;
    next();
  });
};

// Register admin
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query('INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING id', [username, hashedPassword, 'admin']);
    logger.info(`Admin registered: ${username}`);
    res.status(201).send({ id: result.rows[0].id });
  } catch (error) {
    res.status(500).send("Error registering admin");
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length === 0) return res.status(404).send("User not found!");

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send("Invalid credentials!");

    const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
    logger.info(`User logged in: ${username}`);
    res.send({ token });
  } catch (error) {
    res.status(500).send("Error logging in");
  }
});

// Logout
router.post('/logout', (req, res) => {
  // Implement logout logic (e.g., blacklist token)
  res.send("User logged out");
});

// Verify token
router.get('/verify', verifyToken, (req, res) => {
  res.send("Token is valid");
});

// Get user profile
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT username, role FROM users WHERE id = $1', [req.userId]);
    if (result.rows.length === 0) return res.status(404).send("User not found!");
    
    res.send(result.rows[0]);
  } catch (error) {
    res.status(500).send("Error fetching profile");
  }
});

module.exports = router;
