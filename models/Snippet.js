const mongoose = require("mongoose");
const Schema = mongoose.Schema

const snippetSchema = new Schema({
    name: String,
    github: String,
    authorId: String
})


module.exports = mongoose.model("Snippet", snippetSchema);