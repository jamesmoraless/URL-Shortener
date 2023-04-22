//this file is used to seperate the queries with the controller methods since it would allow for ease of readability 
//and scalability when it comes to longer queries and more complexe APIs
const getLinks = "SELECT links.originallink, shortlink FROM links WHERE links.username = $1";
const getOLinkByShort = "SELECT originallink FROM links WHERE shortlink = $1";//$1 is the parameter passed into the query 
const checkUsernameExists = "SELECT s FROM users s WHERE s.username = $1";//alias for username 
const addUser = "INSERT INTO users (username, password) VALUES ($1, $2)";//two arguments passed into the query
const addLink = "INSERT INTO links (username, originallink, shortlink) VALUES ($1, $2, $3)";//3 arguments passed and organised with a username 

module.exports = {
    getLinks,
    getOLinkByShort,
    checkUsernameExists,
    addUser,
    addLink,
}