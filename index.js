/** Things to work on -->
 * Figure out how to add the client interface to interact with the api (change most of the post method)
 * Find out how to reset the database to avoid storage issues 
 * Make sure id's are unique and that they dont point at any other links 
 * Clean up the code and delete any random console.log points 
 * 
 */
const express = require('express');
const app = express();//initializes the app 
const PORT = 8080;
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database("./linkBank.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
    console.log("connection succesful");
});//connects to the database 

//db.run("CREATE TABLE oLinks(id, originLink)");//created my table 

const sqlInto = ("INSERT INTO oLinks(id, originLink) VALUES (?,?)")//reusable query to insert a row into the table with an id and origin link value 
const sqlSelect = ("SELECT * FROM oLinks")//resuable query to select all rows from the table in order to visualize changes


app.use(express.json())//middleware that makes the request into a json object
app.use(express.static("public")) //this middleware gets the static files in public folder and executes this before anything below

//first endpoint... response status is 200 meaning everything is okay, then info is sent 
app.post('/shorten', (req, res) => {

    const { link } = req.body;//instead of body, I'm thinking the link will come from query param value and the param is /:longUrl (checks /?longUrl= X)
    let id = Math.floor(10000 + (90000 - 10000) * Math.random());

    if (!link) {
        res.status(418).send({ message: 'We need a link!' });
    }

    // while ((`SELECT EXISTS("Select * FROM oLinks WHERE id=${id} LIMIT 1"))`))//if a row of id=X exists... keep remaking the id. loop breaks when id does not exist
    // {
    //     id = Math.floor(10000 + (90000 - 10000) * Math.random());

    // }
    
    db.run(sqlInto, [id, link],  (err) => {
        if (err) return console.error(err.message);
        console.log("a new row has been added");
    });//adds a row with the inputted data 

    db.all(sqlSelect, [], (err, rows) => {
        if (err) console.error(err.message);
        rows.forEach((row) => {console.log(row);});
    });//prints out all the rows in the database 

    res.status(200).send(`http://localhost:${PORT}/${id}`)//figure out how to point this to the inserted link variable
});

app.get('/:id', (req, res) => {
    const { id } = req.params;
    const sqlSelect1 = (`SELECT * FROM oLinks WHERE id = ${id}`)//retrieves the original link from the provided id
    
    db.all(sqlSelect1,(err, rows) => {
        if (err) console.error(err.message);
        res.status(200).redirect(rows[0].originLink);//figure out how to point this to the inserted link variable
    });//prints out the origin url from the database with the specified id

});

app.listen(
    PORT, () => console.log(`its alive on http://localhost:${PORT}`)
)//runs the API on a server defined by the port (port location, function)
