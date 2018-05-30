const Snippet = require("../models/Snippet");

module.exports = {
    async create(req, res) {
        try {
            const { name, github } = req.body
            const authorId = ""
            const snippet = await Snippet.create({
                name,
                github,
                authorId
            })
            return res.json(snippet)
        } catch (error) {
            return res.status(500).send(error)
        }
        
    },
    async list(req, res) {
        try {
            const { name } = req.query
            const snippets = await Snippet.find({ name: new RegExp(name, "i") })
            return res.json(snippets)
        } catch (error) {
            return res.status(500).send(error)            
        }
    }
}