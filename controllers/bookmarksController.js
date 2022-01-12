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
    console.log("POST to /bookmarks")
    //request.body does not handle json. It's handling middleware.
    //We are going to say, hey, app. js, whenever a request comes in. Here's a purse or for JSON to handle.
    // every server is going to need this, it's going to need some way to handle JSON there are different ways to handle JSON, but Express comes with a built in way to handle JSON,
    // curl -H (Header to add to request)"Content-Type: application/json" -X (HTML verb get post, patch, delete) POST -d (my data, the body of my request) '{"name":"AV Club", "url": "https://www.avclub.com"}' (the argument to curl is what URL to hit) localhost:3003/bookmarks
    // response.send(request.body)

    //GET the new bookmark on request.body into our array
    //Send back the whole bookmarks array as json
    //BONUS: Send a 201 ("Created") HTTP status code
        // it means yes we successfully created it will not have you do error, any error handling on this one because they really talked about how to handle what can go wrong with a post.

        // HOW TO CHECK IF THIS new bookmark ALREADY EXISTS BEFORE PUSHING ???
        //So there are libraries that will do that, that will examine the objects, a nest, you know every nested property and see if it's the exact same. You could also write a function to do that, to check all the properties of an object and see if they're the same.
        bookmarksList.push(request.body);
        response.status(201).json(bookmarksList)
})

// One problem with the above approach if we restart the server the data is gone!
//We'll fix that with databases sot hat our data sticks around even if our server crashes
//The technical term for this is persistence.

//DELETE a specific bookmark
bookmarks.delete("/:index", (request, response) => {
    console.log("DELETE to /:index")
    const { index } = request.params
    if(bookmarksList[index]) {
        // `.splice` returns an array of the values removed, so we can do either of the following:
        //Destructure array, which selects the first object in the array like so
        const [ deletedBookmark ] = bookmarksList.splice(index, 1)
        // response.json(bookmarksList)
        response.status(200).json(deletedBookmark)
    } else {
        response.status(404).json({error: "Bookmark not found"})
    }
})

// UPDATING 
bookmarks.put("/:index", (request, response) => {
    const { index } = request.params;
    bookmarksList[index] = request.body
    if (bookmarksList[index]) {
        response.status(200).json(bookmarksList)
    } else {
        response.status(404).json({error: "Bookmark not found"})
    }
})
//IN PATCH - you'll just change a specific key/value pair in object
//IN PUT - you'll be replacing the whole object with something new 

//Export the bookmarks controller/router so that app can delegate the /bookmarks route to it
module.exports = bookmarks;