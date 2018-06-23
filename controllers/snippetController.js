const Snippet = require("../models/Snippet");
const exec = require("exec-then");
const zipFolder = require('zip-folder');
const fs = require("fs")
const fse = require("fs-extra")

module.exports = {
    async create(req, res) {
        try {
            const { name, repository, description } = req.body
            const { author } = req.headers

            const snippet = await Snippet.create({
                name,
                repository,
                description,
                author: author._id
            })

            return res.json(snippet)
        } catch (error) {
            return res.status(500).send(error)
        }
    },
    async list(req, res) {
        try {
            const { name } = req.query
            const snippets = await Snippet.find({ name: new RegExp(name, "i") }).populate("author").exec();
            return res.json(snippets)
        } catch (error) {
            return res.status(500).send(error)            
        }
    },
    async check(req, res) {
        const { snippet } = req.params
        const _snippet = await Snippet.findOne({ name: snippet })
        const repository = _snippet.github

        const snippetZipDir = `./${snippet}.zip`
        fse.removeSync("repo");
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
            console.log(execTest.err)
            return res.status(500).send("Script failed");
        }

        zipFolder('./repo', snippetZipDir, function(err) {
            res.download(snippetZipDir)
        });
    }
}
