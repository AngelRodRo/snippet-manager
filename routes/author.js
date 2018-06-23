const express = require('express');
const router = express.Router();
const authorController = require("../controllers/authorController")
const middleware = require("../middlewares/authentication")

router.route("/")
    .post(authorController.create)


router.get("/:id", authorController.getOne);

module.exports = router;