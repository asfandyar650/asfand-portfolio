// Vercel Serverless Function: /api/contact
module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    const { name, company, message, email } = req.body || {};

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, error: 'Please provide your name.' });
    }

    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, error: 'Please provide a message.' });
    }

    const newMessage = {
      id: 'msg_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      name: name.trim(),
      company: company ? company.trim() : 'N/A',
      email: email ? email.trim() : 'N/A',
      message: message.trim(),
      createdAt: new Date().toISOString()
    };

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received.',
      data: newMessage
    });
  }

  if (req.method === 'GET') {
    return res.json({
      success: true,
      message: 'Contact API is active.'
    });
  }

  return res.status(405).json({ success: false, error: 'Method Not Allowed' });
};
