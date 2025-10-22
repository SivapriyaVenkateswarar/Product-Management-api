const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/login', (req, res) => {
  const { clientKey, clientSecret } = req.body;

  if (clientKey === process.env.CLIENT_KEY && clientSecret === process.env.CLIENT_SECRET) {
    const token = jwt.sign(
      { clientKey },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY }
    );
    return res.json({ token });
  }

  res.status(401).json({ message: 'Invalid client credentials' });
});

module.exports = router;
