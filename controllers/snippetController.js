const Snippet = require("../models/Snippet");
const exec = require("exec-then");
const zipFolder = require('zip-folder');
const fse = require("fs-extra")
const slug = require("slug")

const sniptor = {
    async procedure() {
       return await exec(`
            sh procedure.sh
        `);
    }
}

const git = {
    async clone(repository) {
        return await exec(`
            git clone ${repository} repo
        `)
    }
}

module.exports = {
    async create(req, res) {
        try {
            const { name, repository, description } = req.body
            const { author } = req.headers

            const snippet = await Snippet.create({
                name,
                slug: slug(name.toLowerCase()),
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
    async validate(repository) {
        fse.removeSync("repo");
        if (!repository) {
            return res.status(503).send({
                message: "Repository not found"
            });
        }

        await git.clone(repository);
        const resTest = await sniptor.procedure();

        if (resTest.err) {
            return false;
        }
        return true;
    },
    async generate(snippet, repository) {
        const snippetZipDir = `./${snippet}.zip`
        const isValid = await this.validate(snippet, repository);
        if (!isValid) {
            return false;
        }

        await new Promise((resolve, reject) => {
            zipFolder('./repo', snippetZipDir, resolve);
        })
        return true;
    },
    async check(req, res) {
        const { snippet } = req.params
        const snippetZipDir = `./${snippet}.zip`

        const _snippet = await Snippet.findOne({ slug: snippet })
        const repository = _snippet.github
        
        const res = await this.generate(snippet, repository);
        if (res) {
            return res.download(snippetZipDir)
        }

        return res.send(500);
    }
}
