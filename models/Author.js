import { mongo } from "mongoose";

const mongoose = require("mongoose")
const { Schema } = mongoose
const bcrypt = require("bcrypt")
const salts = 10

const authorSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    github: String
})

authorSchema.statics.register = () => {
    const password = ""
    bcrypt.genSalt(10, () => {
        bcrypt.hash(password, salt, (err, hash) => {

        })
    })
}

module.exports = mongoose.model("Author", authorSchema);