require('dotenv').config();

const authMiddleware = (req, res, next) => {
  const key = req.headers['x-client-key'];
  const secret = req.headers['x-client-secret'];

  if (key === process.env.CLIENT_KEY && secret === process.env.CLIENT_SECRET) {
    return next(); // credentials valid, proceed to route
  }

  return res.status(401).json({ message: 'Unauthorized' });
};

module.exports = authMiddleware;
