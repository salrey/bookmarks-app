// DEPENDENCIES
const express = require("express");

//FILES 
const bookmarksController = require("./controllers/bookmarksController")

// CONFIGURATION
const app = express();

// ROUTES
app.get("/", (request, response) => {
    console.log("GET request received to route: /")
    response.send("Welcome to Bookmarks App");
});

// Delegate everything that starts with /bookmarks to the bookmarks controller
// .use takes two arguments the route, 
// - the subroute for the controller to handle  
// - which controller should handle it
//For any route that starts with /bookmarks, use the bookmarks controller
app.use("/bookmarks", bookmarksController)

//ERROR Handling
// Star (*) matches anything we haven't matched in previous routes yet
app.get("*", (request, response) => {
    //The right way to do this is o send it on an object that way when you do on the front end, fetch request response that JSON, you do a quick check. Is there a key called an error on the object you just sent me. 
    response.status(404).json({ error: "Page not found"})
})

// EXPORT our app for server.js
module.exports = app;