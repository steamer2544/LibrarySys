const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.mongo_url || "mongodb://localhost:27017/test")
.then(() => console.log('connect success'));

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    issuedBooks: [{
        bookName: String,
    }],
    numberOfIssuedBooks: Number,
    signedIn: Boolean
});

const User = new mongoose.model("User", userSchema);

module.exports = User;