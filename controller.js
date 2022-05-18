//controlls the response and request handling thus it uses the post, get etc methods
const express = require("express");
const app = express(); //initializes the app
const PORT = 8080;

//import DatabaseService class from './service.js';
const DatabaseService = require("./service.js");
const Storager = new DatabaseService(); //instantiates a DatabaseService object
app.use(express.json()); //middleware that makes the request into a json object
app.use(express.static("public")); //this middleware gets the static files in public folder and executes this before anything below

app.post("/shorten", (req, res) => {
  const { link } = req.body; //instead of body, I'm thinking the link will come from query param value and the param is /:longUrl (checks /?longUrl= X)
  let id = Math.floor(10000 + (90000 - 10000) * Math.random());
  if (!link) {
    res.status(418).send({ message: "We need a link!" });
  }
  Storager.intoDB(id, link);
  Storager.printAll();
  res.status(200).send(`http://localhost:${PORT}/${id}`);
});

app.get("/:id", (req, res) => {
  const { id } = req.params;
  Storager.getOriginLink(id).then((rs) => {
    res.status(200).redirect(rs[0].originLink);
  });
});

Storager.restartDB();

app.listen(PORT, () => console.log(`its alive on http://localhost:${PORT}`)); //runs the API on a server defined by the port (port location, function)
