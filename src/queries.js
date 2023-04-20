//this file is used to seperate the queries with the controller methods since it would allow for ease of readability 
//and scalability when it comes to longer queries and more complexe APIs
const getLinks = "SELECT links.originallink, shortlink FROM links INNER JOIN users ON users.username = links.username;";
const getOLinkByShort = "SELECT originallink FROM links WHERE shortlink = $1"//$1 is the parameter passed into the query 
const checkUsernameExists = "SELECT s FROM users s WHERE s.username = $1";//alias for username 
const addUser = "INSERT INTO users (username, password) VALUES ($1, $2)";//two arguments passed into the query

module.exports = {
    getLinks,
    getOLinkByShort,
    checkUsernameExists,
    addUser,
}