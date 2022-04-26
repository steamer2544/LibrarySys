const express = require('express');
const app = express();

const authenticationController = require("../controllers/authenticationController");
const libraryController = require("../controllers/libraryController");

app
    .route("/")
    .get(authenticationController.getWelcome);

app
    .route("/register")
    .get(authenticationController.getRegister)
    .post(authenticationController.postRegister);

app
    .route("/login")
    .get(authenticationController.getLogin)
    .post(authenticationController.postLogin);

//user
app
    .route("/dashboardUser/:userID")
    .get(libraryController.getLibrary);

app
    .route("/dashboardUser/:userID/signout")
    .post(libraryController.postSignout);

app
    .route("/dashboardUser/:userID/issueBook")
    .post(libraryController.postIssueBook);

app
    .route("/dashboardUser/:userID/returnBook")
    .post(libraryController.postReturnBook);

app
    .route("/dashboardUser/:userID/newBook")
    .get(libraryController.getNewBook)
    .post(libraryController.postNewBook);

//admin
app
    .route("/dashboardAdmin/:userID")
    .get(libraryController.getLibrary);

app
    .route("/dashboardAdmin/:userID/signout")
    .post(libraryController.postSignout);

app
    .route("/dashboardAdmin/:userID/issueBook")
    .post(libraryController.postIssueBook);

app
    .route("/dashboardAdmin/:userID/returnBook")
    .post(libraryController.postReturnBook);

app
    .route("/dashboardAdmin/:userID/newBook")
    .get(libraryController.getNewBook)
    .post(libraryController.postNewBook);

module.exports = app;