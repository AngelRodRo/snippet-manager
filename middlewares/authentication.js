const jwt = require("jsonwebtoken");

module.exports = (req, res) => {
    const token = req.headers.token || req.body.token || req.query.token

    jwt.verify(token, secret, () => {

    })
}