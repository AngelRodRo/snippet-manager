const Author = require("../models/Author")

module.exports = {
    async create(req, res) {
        try {
            const { firstName, lastName, email, github, password } = req.body;
            const author = await Author.create({
                firstName,
                lastName,
                password,
                email,
                github
            })

            return res.json(author)
        } catch (error) {
            return res.status(500).send(error)
        }
    },
    async login(req, res) {
        const { email, password } = req.body
        try {
            const author = await Author.login({ email, password })
            return res.json(author)            
        } catch (error) {
            return res.status(500).send(error)
        }

    }
}