//controller is used for handling api methods 
const pool = require('../db');
const createAccount = (req, res) => {
  const {username, password} = req.body;

  //check if username exists 
  pool.query(queries.checkUsernameExists, [username], (err, result)=>{
    if (result.rows.length){
      res.send("username already exists.");
    }
  });
  
}

module.exports = {
  createAccount,
};

/*
const DatabaseService = require("../service.js");
const storager = new DatabaseService(); //instantiates a DatabaseService object

app.post("/account", (req, res) => {
  const { username } = req.body; 
  if (storager.checkIfUsernameExists(username)) {
    res.status(418).send({ message: "This username already exists!" });
  } 
  res.status(200).send(`http://localhost:${PORT}/shorten`);
});

app.post("/shorten", (req, res) => {
  const { link } = req.body; 
  const { username } = req.body;
  let id = storager.generateID(6);
  if (!link || !username) {
    res.status(418).send({ message: "We need a link AND username!" });
  }
  storager.insertLink(id, link, username);
  res.status(200).send(`http://localhost:${PORT}/${id}`);
  storager.readAllLinks();

});

app.get("/statistics", (req, res) => {
  const { username } = req.body;
  if(storager.checkIfUsernameExists(username)){
    storager.readAllLinks(username);
    res.status(200).send({message: "Username exists and I must return the user info"})
  }
  else{
    res.status(400).send({message: "Username does not exist"})
  }
});

app.get("/:id", (req, res) => {
  const { id } = req.params;
  const { username } = req.body;
  storager.getOriginLink(id,username).then((rs) => {
    console.log(rs);

    //res.status(200).redirect(rs[0].originLink);
  }).catch(err => {console.log(err);});
});

storager.clearLinksList();
*/
