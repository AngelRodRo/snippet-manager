const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const snippetSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String
    },
    repository: String,
    author: { type: Schema.Types.ObjectId, ref: "Author" },
    description: String
})

module.exports = mongoose.model("Snippet", snippetSchema);