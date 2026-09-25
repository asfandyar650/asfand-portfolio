const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const messagesFilePath = path.join(__dirname, '..', 'data', 'messages.json');

// Helper function to read messages safely
function getMessages() {
  try {
    if (!fs.existsSync(messagesFilePath)) {
      fs.writeFileSync(messagesFilePath, '[]', 'utf8');
      return [];
    }
    const data = fs.readFileSync(messagesFilePath, 'utf8');
    return JSON.parse(data || '[]');
  } catch (err) {
    console.error('Error reading messages:', err);
    return [];
  }
}

// Helper function to save messages safely
function saveMessages(messages) {
  try {
    fs.writeFileSync(messagesFilePath, JSON.stringify(messages, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error saving messages:', err);
    return false;
  }
}

/**
 * @route   POST /api/contact
 * @desc    Submit a contact message from the portfolio website
 * @access  Public
 */
router.post('/', (req, res) => {
  const { name, company, message, email } = req.body;

  // Validation
  if (!name || !name.trim()) {
    return res.status(400).json({
      success: false,
      error: 'Please provide your name.'
    });
  }

  if (!message || !message.trim()) {
    return res.status(400).json({
      success: false,
      error: 'Please provide a message.'
    });
  }

  const newMessage = {
    id: 'msg_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    name: name.trim(),
    company: company ? company.trim() : 'N/A',
    email: email ? email.trim() : 'N/A',
    message: message.trim(),
    createdAt: new Date().toISOString(),
    ip: req.ip || req.headers['x-forwarded-for'] || 'Unknown'
  };

  const messages = getMessages();
  messages.unshift(newMessage); // Add new message to top

  const saved = saveMessages(messages);
  if (!saved) {
    return res.status(500).json({
      success: false,
      error: 'Failed to save message. Please try again later.'
    });
  }

  console.log(`[New Message Received] From: ${newMessage.name} (${newMessage.company})`);

  return res.status(201).json({
    success: true,
    message: 'Thank you! Your message has been received.',
    data: {
      id: newMessage.id,
      name: newMessage.name,
      createdAt: newMessage.createdAt
    }
  });
});

/**
 * @route   GET /api/contact
 * @desc    Get all received messages (latest first)
 * @access  Public (for portfolio admin)
 */
router.get('/', (req, res) => {
  const messages = getMessages();
  res.json({
    success: true,
    count: messages.length,
    messages
  });
});

module.exports = router;
