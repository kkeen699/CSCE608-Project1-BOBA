const jwt = require('jsonwebtoken');
require("dotenv").config();

function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: 'Access denied' });
  try {
   const decoded = jwt.verify(token, process.env.PASSPORT_SECRET);
   req.id = decoded.id;
   next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
  
module.exports = verifyToken;