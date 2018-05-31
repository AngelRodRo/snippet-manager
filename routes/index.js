const express = require('express');
const router = express.Router();

const authorController = require("../controllers/authorController")

router.get("/", (req, res) => {
  res.send("Snippet manager");
})

router.post("/login", authorController.login)

module.exports = router;
