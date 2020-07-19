let express = require('express');
let router = express.Router();
const articleController = require('../controllers/articleController');
const cors = require('./cors');
router.post('/create',articleController.create);
router.get('/page/:pageNum',articleController.getPage);
router.get('/page-with-count/:pageNum',articleController.getPageWithCountPages);
router.get('/numpages',articleController.getNumPages);
router.delete('/delete/:id',articleController.delete);
router.put('/update',articleController.update);

module.exports = router;