const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
  const { clientId, clientSecret } = req.body;

  // Check credentials (for now hardcoded, can use env variables)
  if (
    clientId === process.env.CLIENT_ID &&
    clientSecret === process.env.CLIENT_SECRET
  ) {
    // Generate JWT token
    const token = jwt.sign(
      { clientId }, // payload
      process.env.JWT_SECRET, // secret key
      { expiresIn: '1h' } // token expiry
    );

    return res.json({ token });
  }

  return res.status(401).json({ message: 'Invalid credentials' });
};
