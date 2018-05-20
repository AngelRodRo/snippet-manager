const express = require('express');
const router = express.Router();
const dependencies = require("../dependencies.json")
const exec = require("exec-then");
const zipFolder = require('zip-folder');
const fs = require("fs")
const fse = require("fs-extra")

router.get("/:snippet/check", async (req, res) => {
  const { snippet } = req.params
  const repository = dependencies[snippet]
  const snippetZipDir = `./${snippet}.zip`

  if (!repository) {
    return res.status(503).send({
      message: "Not found repository"
    });
  }

  const cloneRepository = await exec(`
      git clone ${repository} repo
  `)

  const execTest = await exec(`
      sh procedure.sh
  `);

  if (execTest.err) {
    return res.status(500).send(execTest.err);
  }

  zipFolder('./repo', snippetZipDir, function(err) {
      res.download(snippetZipDir)
  });
})

module.exports = router;
