const Author = require("../models/Author")

module.exports = {
    async create(req, res) {
        try {
            const { firstName, lastName, email, github, password } = req.body;
            const author = await Author.register({
                firstName,
                lastName,
                email,
                github
            })

            return res.json(author)
        } catch (error) {
            return res.status(500).send(error)
        }
    }
}