// middleware/auth.js

const { admin } = require('../firebase');

const authenticate = async (req, res, next) => {
  const header = req.headers['authorization'];
  if (!header) {
    return res.status(401).json({ message: 'Authorization header is missing' });
  }

  const token = header.split(' ')[1];
  console.log(token);
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: 'Unauthorized' });
  }
};

module.exports = { authenticate };