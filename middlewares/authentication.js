const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports.authenticate =  (req, res, next)  => {
  const token = req.body.token || req.query.token || req.headers.authorization;
  if (!token) {
    return res.sendStatus(401);
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) { 
      return res.sendStatus(401);
    }
    req.headers.author = decoded;
    next();
  })
}
