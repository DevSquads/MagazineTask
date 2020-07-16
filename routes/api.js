let express = require('express');
let router = express.Router();
const articleController = require('../controllers/articleController');

router.post('/create',articleController.create);



module.exports = router;