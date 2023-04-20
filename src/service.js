/*sqlite3 = require("sqlite3").verbose();

//Insert links 10 /shorten
//read all links /statistics
//sign into website with account username /account
class DatabaseService {
  _db;
  constructor() {
    this._db = new sqlite3.Database(
      "./shortenerLinks.db",
      sqlite3.OPEN_READWRITE,
      (err) => {
        if (err) return console.error(err.message);
        console.log("DB connection succesful");
      }
    ); //connects to the database
    //this._db.run("CREATE TABLE myLinksTable(id, originLink, username)")
  }

  generateID(length) {
    return parseInt(
      Math.ceil(Math.random() * Date.now())
        .toPrecision(length)
        .toString()
        .replace(".", "")
    );
  }

  checkIfUsernameExists(username){
    const sqlSelect = `SELECT * FROM myLinksTable WHERE username = ${username}`;
    this._db.all(sqlSelect, (err, rows) => {
      if (err) {
        console.error(err.message);
        console.log(sqlSelect);
        return false;// username does not exist 
      }
      else{
        // if(rows.length === 0){
        //   console.log(false);
        //   return false;//username does not exist
        // }
        console.log(true);
        return true;//username exists
      }
    }); 
  }

  insertLink(id, link, username) {
    const sqlInto = "INSERT INTO myLinksTable(id, originLink, username) VALUES (?,?,?)"; //reusable query to insert a row into the table with an id and origin link value
    this._db.run(sqlInto, [id, link,username], (err) => {
      if (err) console.error(err.message);
    }); //adds a row with the inputted data
  }
  
  readAllLinks() {
    const sqlSelect3 = `SELECT * FROM myLinksTable`; //reusable query to select all rows from the table in order to visualize changes
    this._db.all(sqlSelect3, [], (err, rows) => {
      if (err) console.error(err.message);
      rows.forEach((row) => {
        console.log(row);
      });
    }); //prints out all the rows in the database
  }
  
  getOriginLink(id,username) {
    return new Promise((resolve, reject) => {
      const sqlSelect1 = `SELECT originLink FROM myLinksTable WHERE id = ${id} AND username = ${username}`; //retrieves the original link from the provided id
      this._db.serialize(() => {
        this._db.all(sqlSelect1, (err, rows) => {
          if (err) reject(err);
          resolve(rows);
        });
      });
    });
  }

  clearLinksList() {
    this._db.run("DELETE FROM myLinksTable"); //deleted my table at the end of running the server
  }
}

module.exports = DatabaseService;
*/
