const express = require('express');
const router = express.Router();
const snippetController = require("../controllers/snippetController")
const middlewares = require("../middlewares/authentication")

router.get("/:snippet/check", snippetController.check);
router.get("/", snippetController.list);
router.use(middlewares.authenticate);

router.route("/")
    .post(snippetController.create)


module.exports = router;