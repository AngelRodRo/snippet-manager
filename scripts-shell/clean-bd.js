const mongoose = require("mongoose")
const conn = mongoose.connect("mongodb://localhost/sniptordb")
mongoose.connection.on('open', function(){
    mongoose.connection.db.dropDatabase(function() {
        process.exit();
    });
});