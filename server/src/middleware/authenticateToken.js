const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.status(401).json({ error: 'Authentication failed' });

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token is not valid' });
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;