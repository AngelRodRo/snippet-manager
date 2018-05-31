const express = require('express');
const router = express.Router();
const authorController = require("../controllers/authorController")

router.route("/")
    .post(authorController.create)


module.exports = router;
