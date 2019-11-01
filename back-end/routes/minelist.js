var express = require('express');
var router = express.Router();
var movielist = require('../controllers/minelist');
var uploadMiddleware=require('../middlewares/upload');

router.route('/')
    .get(movielist.findAll)
    .post(uploadMiddleware,movielist.save)
    .patch(uploadMiddleware,movielist.update)
    .delete(movielist.remove)

router.get('/findOne',movielist.findOne);
router.post('/search',movielist.search);

module.exports = router;