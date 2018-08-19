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
    async clone(snippet, repository) {
        return await exec(`
            git clone ${repository} snippets/${snippet}
        `)
    }
}

const create = async (req, res) => {
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
};

const list = async (req, res) => {
    try {
        const { name } = req.query
        const snippets = await Snippet.find({ name: new RegExp(name, "i") }).populate("author").exec();
        return res.json(snippets)
    } catch (error) {
        return res.status(500).send(error)            
    }
};

const validate = async (snippet, repository) => {
    fse.removeSync(`snippets/${snippet}`);
    if (!repository) {
        return res.status(503).send({
            message: "Repository not found"
        });
    }

    await git.clone(snippet, repository);
    const resTest = await sniptor.procedure();
    if (resTest.err) {
        return false;
    }
    return true;
};

const generate = async (snippet, repository) => {
    const snippetZipDir = `./snippets/${snippet}.zip`
    const isValid = await validate(snippet, repository);
    if (!isValid) {
        return false;
    }

    await new Promise((resolve, reject) => {
        zipFolder(`./snippets/${snippet}`, snippetZipDir, resolve);
    })
    return true;
}

const check = async (req, res) => {
    const { snippet } = req.params
    const snippetZipDir = `./snippets/${snippet}.zip`
    debugger
    const _snippet = await Snippet.findOne({ slug: snippet })
    const {repository} = _snippet
    const resp = await generate(snippet, repository);
    console.log(resp)
    if (resp) {
        return res.download(snippetZipDir)
    }

    return res.send(500);
}

module.exports = {
    create,
    list,
    validate,
    generate,
    check
    
}
