const express = require('express');
const app =express();//initializes the app 
const PORT = 8080;

app.use(express.json())

//first endpoint... response status is 200 meaning everything is okay, then info is sent 
app.get('/tshirt', (req, res) => {
    res.status(200).send(
        {
        tshirt: 'xy', 
        size: 'large'
        }
    )
});

app.post('/tshirt/:id', (req, res) => {
    const { id } = req.params;
    const { logo } = req.body;

    if (!logo)
    {
        res.status(418).send({message: 'We need a logo!'})
    }

    res.send({tshirt: `X with your ${logo} and ID of ${id}`})
});


app.listen(
    PORT, () => console.log(`its alive on http://localhost:${PORT}`)
)//runs the API on a server defined by the port 
 