// DEPENDENCIES
const express = require("express");

//FILES 
const bookmarksController = require("./controllers/bookmarksController")

// CONFIGURATION
const app = express();

//MIDDLEWARE 

// JSON parsing middleware
// For every request, parse incoming information as JSON
// So use our JSON parser
// So that here in our terminal. we don't have to keep having our GET requests logged right all these GET requests we logged ourselves will use middleware to do that for us. Eventually, but this is what we actually want this time we want a jSON parsing middleware that takes that JSON and handles that
app.use(express.json())

// In the middle of every request, check if the endpoint starts with /bookmarks 
// If so send it to the bookmarks controller router
// Before we get this request, bookmarks controller is beign used by express
// This runs in the middle 

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

//ERROR Handling
// Star (*) matches anything we haven't matched in previous routes yet
app.get("*", (request, response) => {
    //The right way to do this is o send it on an object that way when you do on the front end, fetch request response that JSON, you do a quick check. Is there a key called an error on the object you just sent me. 
    response.status(404).json({ error: "Page not found"})
})

// EXPORT our app for server.js
module.exports = app;