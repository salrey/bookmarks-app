// DEPENDENCIES
const express = require("express");

//FILES 
const bookmarksController = require("./controllers/bookmarksController")

// CONFIGURATION
const app = express();

// Delegate everything that starts with /bookmarks to the bookmarks controller
// .use takes two arguments the route, 
// - the subroute for the controller to handle  
// - which controller should handle it
//For any route that starts with /bookmarks, use the bookmarks controller
app.use("/bookmarks", bookmarksController)

// ROUTES
app.get("/", (request, response) => {
    console.log("GET request received to route: /")
    response.send("Welcome to Bookmarks App");
});

// EXPORT our app for server.js
module.exports = app;