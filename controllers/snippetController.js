const Snippet = require("../models/Snippet");

module.exports = {
    create(req, res) {
        const { name, github } = req.body
        Snippet.create({
            name,
            github
        })
    }
}