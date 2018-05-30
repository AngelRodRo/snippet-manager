const Snippet = require("../models/Snippet");

module.exports = {
    async create(req, res) {
        const { name, github } = req.body
        const authorId = ""
        const snippet = await Snippet.create({
            name,
            github,
            authorId
        })
        return res.json(snippet)
    },
    async list(req, res) {
        const { name } = req.query
        const snippets = await Snippet.find({ name: new RegExp(name, "i") })
        return res.json(snippets)
    }
}