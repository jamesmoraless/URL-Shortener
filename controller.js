const express = require("express");
const app = express(); //initializes the app
const PORT = 8080;

const DatabaseService = require("./service.js");
const storager = new DatabaseService(); //instantiates a DatabaseService object
app.use(express.json()); //middleware that makes the request into a json object
app.use(express.static("public")); //this middleware gets the static files in public folder and executes this before anything below

app.post("/shorten", (req, res) => {
  const { link } = req.body; //instead of body, I'm thinking the link will come from query param value and the param is /:longUrl (checks /?longUrl= X)
  let id = storager.generateID(6);
  if (!link) {
    res.status(418).send({ message: "We need a link!" });
  }
  storager.insertLink(id, link);
  res.status(200).send(`http://localhost:${PORT}/${id}`);
});

app.get("/:id", (req, res) => {
  const { id } = req.params;
  storager.getOriginLink(id).then((rs) => {
    res.status(200).redirect(rs[0].originLink);
  });
});

storager.clearLinksList();

app.listen(PORT, () => console.log(`its alive on http://localhost:${PORT}`)); //runs the API on a server defined by the port (port location, function)
