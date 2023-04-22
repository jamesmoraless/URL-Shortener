//controller is used for handling requests and responses  
const pool = require('../db');
const queries = require('./queries');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {nanoid} = require('nanoid/non-secure');

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
      res.status(500).send('Server error.');
}
};

const logUser = async (req, res) => {
  try{
  const {username, password} = req.body;//create a password for the user 

  //check if username exists 
  const user = await pool.query(queries.checkUsernameExists, [username]); 
  
  if (user.rows.length === 0){
    return res.status(400).json({ message : 'Invalid username. Try again.'});
  }

  // Check if password matches
  const isMatch = await bcrypt.compare(password, user.rows[0].password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid password. Try again.' });
  }

  // Generate and return JWT
  const payload = {
    user: {
    id: user.rows[0].id,
    },
    };
    jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });} catch (err) {
    console.error(err.message);
    res.status(500).send('Server error.');
    }
    };


  //authenticate the user (used in all methods)
  const authenticate = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ message: 'No token, autorization failed.'});

    try{
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded.user;
      next();
    } catch (err){
      res.status(401).json({ message: 'Invalid token.'});
    }
  };

  //create short URL
  const addLink = async (req, res) => {
    try{
      const {long_url} = req.body;//later decomposed with JS json parsing
      const short_id = nanoid(10);//generates a unique 10 space id

      const newUrl = await pool.query(queries.addLink, [req.user.id, long_url, short_id]);
      res.json(newUrl.rows[0]);
    }catch(err){
      res.status(500).send('Server error.');
    }
  };


//get redirected to the original link with the short link id
  const getOLinkByShort = async (req, res) => {
    try{
      const {short_id} = req.params.id;
      const url = await pool.query(queries.getOLinkByShort, [short_id]);
      if (url.rows.length === 0){
        return res.status(400).json({ message: 'URL not found'});
      }
      res.status(200).redirect(url.rows[0].long_url);
    }catch(err){
      console.log(err.message);
      res.status(500).send('Server error.');
    }  
  };

   //get original and short links from an account username 
  const getLinks = async (req, res) => {
    try{
      const userId = req.user.id;
      //Fetch the URL statistics from the db
      const stats = await pool.query(queries.getLinks, [userId]);
      //console.log(stats);
      const statsObj = stats.rows.reduce((acc, row) => {
        acc[row.long_url] = row.url_count;
        return acc;
      }, {});
      res.json(statsObj);

    }catch(err){
      console.error(err);
      res.status(500).send('Server error.')
    }
  }; 
       
module.exports = {
  getLinks,
  getOLinkByShort,
  addUser,
  logUser,
  authenticate,
  addLink,
};

