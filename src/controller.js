//controller is used for handling requests and responses  
const pool = require('../db');
const queries = require('./queries')

//get original and short links from an account username 
//must add the username checking functionality 
const getLinks = (req, res) => {
  pool.query(queries.getLinks, (err, results)=>{
    if (err) throw err;
    res.status(200).json(results.rows);
  })
};
//get redirected to the original link with the short link id
const getOLinkByShort = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getOLinkByShort, [id], (err, results)=>{
    if(err) throw err;
    res.status(200).redirect(results.rows[0].originallink);
  });
};


const addUser = (req, res) => {
  const {username, password} = req.body;//create a password for the user 

  //check if username exists 
  pool.query(queries.checkUsernameExists, [username], (err, results)=>{    
    if (results.rows.length){
      res.send("Username already exists. Try another username.");
    }
  });
  //add user to db
  pool.query(queries.addUser, [username, password], (err, results) =>{
    if (err) throw err;
    res.status(200).send("succesfully added user");//I want this to then send you to a new page that welcomes you 
    //and then allows you to shorten links 
  });
};


////must add a storeLink method that:
//stores the original link 
//generates a short link id
//stores the original link with the user's username, and the short link id 
//then after an add, refresh the page to view links table 
const addLink = (req, res) => {
  const {username, originallink, shortlink} = req.body;//later decomposed with JS json parsing
  pool.query(queries.addLink, [username, originallink, shortlink], (err, results) => {
    if (err) throw err;
    res.status(200).send("succesfully added a link");
  })
}

////must add a deleteLink method that:
//once you click a button on the html site, you can delete this row 

//must add a Login method that:
//checks if username exists, if so 
//find the username such that the inserted password is linked to it, if the rows is greather than 1... 
////redirect to welcome page same as the addUser method 
//if not, send a message saying the username doesnt exist 


module.exports = {
  getLinks,
  getOLinkByShort,
  addUser,
  addLink,
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
