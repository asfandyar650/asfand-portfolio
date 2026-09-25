const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const projectsFilePath = path.join(__dirname, '..', 'data', 'projects.json');

/**
 * @route   GET /api/projects
 * @desc    Get all portfolio projects
 * @access  Public
 */
router.get('/', (req, res) => {
  try {
    if (!fs.existsSync(projectsFilePath)) {
      return res.json({ success: true, count: 0, projects: [] });
    }
    const data = fs.readFileSync(projectsFilePath, 'utf8');
    const projects = JSON.parse(data || '[]');
    res.json({
      success: true,
      count: projects.length,
      projects
    });
  } catch (err) {
    console.error('Error reading projects data:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve projects.'
    });
  }
});

module.exports = router;
