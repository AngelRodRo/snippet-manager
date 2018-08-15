const express = require('express');
const router = express.Router();
const exec = require("exec-then");

const authorRoutes = require("./author");
const snippetRoutes = require("./snippet");

const authorController = require("../controllers/authorController")

router.get("/", (req, res) => {
  res.send("Snippet manager");
})

router.post("/login", authorController.login);
router.use("/author", authorRoutes);
router.use("/snippet", snippetRoutes);
router.post("/update-branch", async (req, res) => {
  console.log(req.body)
  const resp = await exec(`
    npm run build
  `);
  
  res.send(JSON.stringify(resp));
})

module.exports = router;