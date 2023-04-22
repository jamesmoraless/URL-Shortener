const express = require("express");
const shortenerRoutes = require('./Back-End/routes')
const app = express(); //initializes the app
const PORT = process.env.PORT || 3000;
app.use(express.json()); //middleware that makes the request into a json object
//app.use(express.static("public")); //this middleware gets the static files in public folder and executes this before anything below

app.use('/api/v1/urlshortener', shortenerRoutes);

app.listen(PORT, () => console.log(`its alive on http://localhost:${PORT}`)); //runs the API on a server defined by the port (port location, function)
