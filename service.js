sqlite3 = require("sqlite3").verbose();

class DatabaseService {
  _db;
  constructor() {
    this._db = new sqlite3.Database(
      "./myLinks.db",
      sqlite3.OPEN_READWRITE,
      (err) => {
        if (err) return console.error(err.message);
        console.log("DB connection succesful");
      }
    ); //connects to the database
  }
  
  generateID(length) {
    return parseInt(
      Math.ceil(Math.random() * Date.now())
        .toPrecision(length)
        .toString()
        .replace(".", "")
    );
  }
  
  insertLink(id, link) {
    const sqlInto = "INSERT INTO myLinks(id, originLink) VALUES (?,?)"; //reusable query to insert a row into the table with an id and origin link value
    this._db.run(sqlInto, [id, link], (err) => {
      if (err) console.error(err.message);
    }); //adds a row with the inputted data
  }
  
  readAllLinks() {
    const sqlSelect = "SELECT * FROM myLinks"; //reusable query to select all rows from the table in order to visualize changes

    this._db.all(sqlSelect, [], (err, rows) => {
      if (err) console.error(err.message);
      rows.forEach((row) => {
        console.log(row);
      });
    }); //prints out all the rows in the database
  }
  
  getOriginLink(id) {
    return new Promise((resolve, reject) => {
      const sqlSelect1 = `SELECT originLink FROM myLinks WHERE id = ${id}`; //retrieves the original link from the provided id
      this._db.serialize(() => {
        this._db.all(sqlSelect1, (err, rows) => {
          if (err) reject(err);
          resolve(rows);
        });
      });
    });
  }
  clearLinksList() {
    this._db.run("DELETE FROM myLinks"); //deleted my table at the end of running the server
  }
}

module.exports = DatabaseService;
