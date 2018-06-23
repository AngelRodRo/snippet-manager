const express = require('express');
const router = express.Router();

const authorRoutes = require("./author");
const snippetRoutes = require("./snippet");

const authorController = require("../controllers/authorController")

router.get("/", (req, res) => {
  res.send("Snippet manager");
})

router.post("/login", authorController.login);
router.use("/author", authorRoutes);
router.use("/snippet", snippetRoutes);

module.exports = router;
