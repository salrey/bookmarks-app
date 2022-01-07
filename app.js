// DEPENDENCIES
const express = require("express");

// CONFIGURATION
const app = express();

// ROUTES
app.get("/", (request, response) => {
    console.log("GET request received to route: /")
    response.send("Welcome to Bookmarks App");
});

// EXPORT our app for server.js
module.exports = app;