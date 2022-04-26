const Library = require("../models/libraryModel.js");
const User = require("../models/userModel.js");




// GET
// library homepage
exports.getLibrary = function (req, res) {
    User.findOne({ _id: req.params.userID }, function (err, foundUser) {
        if (err) {
            res.send(err);
        } else {
            if (foundUser.signedIn == false) {
                res.render("login", { dangerMessage: "Please Sign In before accessing the library." })
            } else {
                Library.find({}, function (err, foundBooks) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.render("DashboardUser", {
                            user: foundUser,
                            books: foundBooks.reverse()
                        });
                    }
                });
            }
        }
    });
}

// POST
// sign out from the library
exports.postSignout = function (req, res) {
    console.log("signing out");
    User.findOne({ _id: req.params.userID }, async function (err, foundUser) {
        if (err) {
            res.send(err);
        } else {
            foundUser.signedIn = false;
            await foundUser.save();
            res.redirect("/");
        }
    });
}

// POST
// issue a book from the library
exports.postIssueBook = function (req, res) {
    User.findOne({ _id: req.params.userID }, async function (err, foundUser) {
        if (err) {
            res.send(err);
        } else {
            var hasBook = false;
            foundUser.issuedBooks.forEach(async function (object) {
                // console.log(object.bookName + " :: " + req.body.bookName);
                if (object.bookName === req.body.bookName) {
                    hasBook = true;
                }
            });
            if (!hasBook) {
                // adding selected book to the user collection
                foundUser.issuedBooks.push({
                    bookName: req.body.bookName,
                });
                await foundUser.save();
                // user issues the new book
                // updating available and issued books in library collection
                Library.findOne({ bookName: req.body.bookName }, async function (error, libraryBook) {
                    if (error) {
                        res.send(err);
                    } else {
                        // console.log(libraryBook);
                        libraryBook.available = libraryBook.available - 1;
                        libraryBook.issued = libraryBook.issued + 1;
                        await libraryBook.save();
                        res.redirect("/library/" + req.params.userID);
                    }
                });
            } else {
                // user already issued the book
                res.redirect("/library/" + req.params.userID);
            }
        }
    });
}

// POST
// return books to the library
exports.postReturnBook = function (req, res) {
    User.findOne({ _id: req.params.userID }, function (err, foundUser) {
        if (err) {
            res.send(err);
        } else {
            // removing book from issuedBooks array of users collection
            foundUser.issuedBooks.forEach(async function (object, index) {
                if (object.isbn == req.body.returnISBN) {
                    foundUser.issuedBooks.splice(index, 1);
                    await foundUser.save();
                }
            });
            // updating available and issued books in Library collection
            Library.findOne({ isbn: req.body.returnISBN }, async function (err, foundBook) {
                if (err) {
                    res.send(err);
                } else {
                    await foundBook.save();
                }
            });
            // redirecting to user's library
            res.redirect("/library/" + req.params.userID);
        }
    });
}

// GET
// add new books to the library
exports.getNewBook = async function (req, res) {
    User.findOne({ _id: req.params.userID }, function (err, foundUser) {
        if (err) {
            res.send(`Please login or register <a href="/">here</a> before accessing the library!`);
        } else {
            if (foundUser.signedIn == false) {
                res.render("login", { dangerMessage: "Please Sign In before adding a book to the library." })
            } else {
                res.render("newBook", { user: foundUser });
            }
        }
    });
}

// POST
// add new books to the library
exports.postNewBook = function (req, res) {
    Library.findOne({ bookName: req.body.newBookName }, async function (err, foundBook) {
        if (err) {
            res.send(err);
        } else {
            if (foundBook) {
                res.send(`Sorry, that book already exists in the library, please try with another book.`);
            } else {
                //in case thare's no cover but i don't care
                //if (req.body.newBookISBN) {
                    const newBook = new Library({
                        bookName: req.body.newBookName,
                        category: req.body.newBookCategory,
                        issued: 0,
                        isbn: req.body.newBookISBN,
                        author: req.body.newBookAuthor
                    });
                    await newBook.save();
                /*} else {
                    const newBook = new Library({
                        bookName: req.body.newBookName,
                        issued: 0,
                        available: 50,
                        total: 50,
                        isbn: "1234",
                        author: req.body.newBookAuthor
                    });
                    await newBook.save();
                }*/
                res.redirect("/library/" + req.params.userID);
            }
        }
    });
}