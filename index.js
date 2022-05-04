const app = require('express')();//initializes the app 
const PORT = 8080;

app.listen(
    PORT, () => console.log('its alive on http://localhost:${PORT}')
)//runs the API on a server defined by the port 