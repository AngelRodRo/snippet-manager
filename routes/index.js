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
  const {payload} = req.body;
  const ref = JSON.parse(payload).ref;
  const isMaster = ref.includes("master");
  if (isMaster) {
    const resp = await exec(`
      sh start.sh
    `);
    return res.send(JSON.stringify(resp));
  }

  return res.send(200);
})

module.exports = router;