//controller is used for handling requests and responses  
const pool = require('../db');
const queries = require('./queries');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


//get original and short links from an account username 
const getLinks = (req, res) => {
  const {username} = req.body;
  pool.query(queries.getLinks, [username], (err, results)=>{
    if (err) throw err;
    res.status(200).json(results.rows);
  })
};

//get redirected to the original link with the short link id
const getOLinkByShort = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getOLinkByShort, [id], (err, results)=>{
    if(err) throw err;
    if (results.rows){
    res.status(200).redirect(results.rows[0].originallink);
  }
  });
};


const addUser = async (req, res) => {
  try{
  const {username, password} = req.body;//create a password for the user 

  //check if username exists 
  const user = await pool.query(queries.checkUsernameExists, [username]);    
  
  if (user.rows.length > 0){
    return res.status(400).json({ message : 'User already exists'});
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //add user to db IF username does not exist 
  const newUser = await pool.query(queries.addUser, [username, hashedPassword]);
  res.status(201).json(newUser.rows[0]);//I want this to then send you to a new page that welcomes you 
    //and then allows you to shorten links 
    }catch (error){
      console.error(err.message);
      res.status(500).send('Server error');
}
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
  });
};

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
