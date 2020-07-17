let express = require('express');
let router = express.Router();
const articleController = require('../controllers/articleController');

router.post('/create',articleController.create);
router.get('/page/:pageNum',articleController.getPage);
router.get('/numpages',articleController.getNumPages);
router.delete('/delete/:id',articleController.delete);
router.put('/update',articleController.update);

module.exports = router;