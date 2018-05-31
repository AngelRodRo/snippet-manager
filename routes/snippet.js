const express = require('express');
const router = express.Router();
const snippetController = require("../controllers/snippetController")
const middlewares = require("../middlewares/authentication")

router.get("/:snippet/check", snippetController.check)

router.use(middlewares.authenticate);
router.route("/")
    .post(snippetController.create)
    .get(snippetController.list)


module.exports = router;
