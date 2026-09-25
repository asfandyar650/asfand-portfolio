require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const contactRoutes = require('./routes/contact');
const projectsRoutes = require('./routes/projects');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: '*', // Allow requests from all origins (localhost & live portfolio)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logger
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// API Routes
app.use('/api/contact', contactRoutes);
app.use('/api/projects', projectsRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Root welcome route
app.get('/', (req, res) => {
  res.json({
    name: 'Asfand Portfolio Backend API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/api/health',
      contact: '/api/contact (POST to send message, GET to list)',
      projects: '/api/projects (GET to list projects)'
    }
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal Server Error'
  });
});

// Start Server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`===============================================`);
    console.log(`🚀 Asfand Portfolio Backend is running!`);
    console.log(`📡 URL: http://localhost:${PORT}`);
    console.log(`👉 Health: http://localhost:${PORT}/api/health`);
    console.log(`👉 Contact: http://localhost:${PORT}/api/contact`);
    console.log(`👉 Projects: http://localhost:${PORT}/api/projects`);
    console.log(`===============================================`);
  });
}

module.exports = app;
