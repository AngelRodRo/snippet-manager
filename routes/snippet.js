const express = require('express');
const router = express.Router();
const snippetController = require("../controllers/snippetController")

router.route("/")
    .post(snippetController.create)
    .get(snippetController.list)

router.get("/:snippet/check", snippetController.check)

module.exports = router;
