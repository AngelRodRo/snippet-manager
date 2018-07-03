const mongoose = require("mongoose")
const { Schema } = mongoose
const bcrypt = require("bcrypt")
const saltRounds = 10

const authorSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    github: String,
    createdAt: {
        type: Date,
        default: new Date
    }
})

authorSchema.pre("save", function(next) {
	const salt = bcrypt.genSaltSync(saltRounds);
	const hash = bcrypt.hashSync(this.password, salt);
	this.password = hash;
	next();
});

authorSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email }).exec()
    if (!user) return user;
    const comp = await bcrypt.compare(password, user.password)
    let _user = user._doc;
    delete _user.password;
    _user.logged = comp;
    return _user;
}

module.exports = mongoose.model("Author", authorSchema);
