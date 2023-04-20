//used for organizing routes 
const { Router } = require("express");
const controller = require('./controller');//access controller methods 
const router  = Router();

router.post('/', () => controller.createAccount);

module.exports = router;

