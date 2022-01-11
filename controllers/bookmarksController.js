//Dependencies 
const express = require("express")
const app = require("../app")
// .Router creates a new controller that handles a subroute. 
// In this case, it will handle everything that starts with /bookmarks
// bookmarks is like a subApp that handles one route
const bookmarks = express.Router()

//FILES
const bookmarksList = require("../models/bookmark")

//ROUTES 
// "/bookmarks" is already assumed because app.js has delegated it to us. 
// The underscore in place of request parameter means that request is not being used 
    // bookmarks.get("/", (_, response) => {

// GET ALL BOOKMARKS
bookmarks.get("/", (_, response) => {
    //We actually want to send JSON vs the bookmarks array
    //***USE JSON.stringify(array) or response.json(array)
    console.log("GET request to /bookmarks")
    response.json(bookmarksList)
})

// GET ONE BOOKMARK BY INDEX
bookmarks.get("/:index", (request, response) => {
    const { index } = request.params
    console.log("GET request to /:index")
    //ERROR HANDLING  
    if (bookmarksList[index]) {
        response.json(bookmarksList[index])
    } else {
        response.status(404).json({error: "Bookmark not found"})
    }
})

//Export the bookmarks controller/router so that app can delegate the /bookmarks route to it
module.exports = bookmarks;