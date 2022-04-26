const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/bookshelflyDB");

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    studentID: String,
    email: String,
    password: String,
    issuedBooks: [{
        bookName: String,
    }],
    //wait for time here!!!
    numberOfIssuedBooks: Number,
    signedIn: Boolean,
    admin: Boolean,
    
});

const User = new mongoose.model("User", userSchema);

module.exports = User;