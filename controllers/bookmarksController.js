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
bookmarks.get("/", (request, response) => {
    //We actually want to sent JSON vs the bookmarks array
    //***USE JSON.stringify(array) or response.json(array)
    response.json(bookmarksList)
})


//Export the bookmarks controller/router so that app can delegate the /bookmarks route to it
module.exports = bookmarks;