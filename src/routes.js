//used for organizing routes 
const { Router } = require("express");
const controller = require('./controller');//access controller methods 
const router  = Router();

//registration send
router.get('/', (req, res) => {
    res.send("This should be the registration page so once api/v1/urlshortener is accesses, this is the registration page");
});

router.get('/myLinks', controller.getLinks);//get all links related to a username (figure out how to pass username)

router.get('/:id', controller.getOLinkByShort);//get redirected to the original link

router.post('/', controller.addUser);

router.post('/addLink', controller.addLink);


module.exports = router;

