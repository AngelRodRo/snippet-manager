const Author = require("../models/Author")
const jwt = require("jsonwebtoken")
const config = require("../config")
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
            const author = await Author.login(email, password)
            const token = jwt.sign(author, config.secret);
            author.token = token;
            return res.json(author);     
        } catch (error) {
            console.log(error)
            return res.status(500).send(error)
        }
    },
    async getOne(req, res) {
        const { id } = req.params;
        try {
            const author = await Author.findOne({ _id: id })
            delete author.password
            return res.json(author)
        } catch (error) {
            console.log(error)
            return res.status(500).send(error)
        }
    }
}
