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
// TIP: Send as a json
// BONUS - send a 404 *if* the index doesn't exist in our bookmarksList
bookmarks.get("/:index", (request, response) => {
    const { index } = request.params
    console.log("GET request to /:index")
    //ERROR HANDLING - status codes 
    if (bookmarksList[index]) {
        response.json(bookmarksList[index])
    } else {
        response.status(404).json({error: "Bookmark not found"})
    }
})

// Create one bookmark
// POST to /bookmarks (which is already there thanks to app.js delegating it to us)
    // if there's three things in list, you want to post to index 3
    // On the backend it's much easier to find out where to POST by simply pushing into the array
// A request to POST /bookmarks will need to include WHAT to ADD
// POST to /bookmarks... but post WHAT? post THIS to bookmarks
bookmarks.post("/", (request, response) => {
    console.log(request.body)
    //request.body does not handle json. It's handling middleware.
    //We are going to say, hey, app. js, whenever a request comes in. Here's a purse or for JSON to handle.
    // every server is going to need this, it's going to need some way to handle JSON there are different ways to handle JSON, but Express comes with a built in way to handle JSON,
    // curl -H (Header to add to request)"Content-Type: application/json" -X (HTML verb get post, patch, delete) POST -d (my data, the body of my request) '{"name":"AV Club", "url": "https://www.avclub.com"}' (the argument to curl is what URL to hit) localhost:3003/bookmarks
    // response.send(request.body)

    //GET the new bookmark on request.body into our array
    //Send back the whole bookmarks array as json
    //BONUS: Send a 201 ("Created") HTTP status code
        // it means yes we successfully created it will not have you do error, any error handling on this one because they really talked about how to handle what can go wrong with a post.
        bookmarksList.push(request.body)
        response.status(201).json(bookmarksList[bookmarksList.length - 1])
})

//Export the bookmarks controller/router so that app can delegate the /bookmarks route to it
module.exports = bookmarks;