const express = require('express');
const app = express();//initializes the app 
const PORT = 8080;

app.use(express.json())//middleware that makes the request into a json object
app.use(express.static("public")) //this middleware gets the static files in public folder and executes this before anything below

//first endpoint... response status is 200 meaning everything is okay, then info is sent 
app.post('/longUrl', (req, res) => {
    //const { link } = req.params;

    const { link } = req.body;//instead of body, we must get this link from a text field OR in the html file, we use formmethod so longUrl="insertedlink" will be the request
    const rand = Math.floor(10000 + (90000 - 10000) * Math.random());

    if (!link)
    {
        res.status(418).send({message: 'We need a link!'})
    }

    res.status(200).send(`myShort.url/${rand}`)//figure out how to point this to the inserted link variable
});

app.listen(
    PORT, () => console.log(`its alive on http://localhost:${PORT}`)
)//runs the API on a server defined by the port (port location, function)
 