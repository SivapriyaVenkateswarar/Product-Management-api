const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']; // Expect: "Bearer <token>"

  if (!token) return res.status(401).json({ message: 'No token provided' });

  const actualToken = token.split(' ')[1];

  jwt.verify(actualToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Unauthorized' });

    req.clientId = decoded.clientId; // attach payload if needed
    next();
  });
};

module.exports = authMiddleware;
