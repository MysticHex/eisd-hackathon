const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    // For hackathon demo convenience: if no token, maybe allow as 'guest' or fail?
    // Let's return 401 to show we have security.
    return res.status(401).json({ message: 'No token provided' });
  }

  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Invalid Authorization header format' });
  }

  const token = authHeader.split(' ')[1];
  
  try {
    // Bypass verify if it's a special "DEMO_TOKEN"
    if (token === 'DEMO_TOKEN') {
        req.user = { id: 'uuid-admin', role: 'admin' };
        return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
};

module.exports = { authenticate, authorize };