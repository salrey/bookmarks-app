// DEPENDENCIES
const express = require("express");

// CONFIGURATION
const app = express();

// ROUTES
app.get("/", (request, response) => {
  response.send("Welcome to Bookmarks App");
});

// EXPORT
module.exports = app;