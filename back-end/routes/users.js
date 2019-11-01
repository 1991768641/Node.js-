var express = require('express');
var router = express.Router();

const {signup,hasUsername} =require('../controllers/register');
const {signin,isSignin,signout}=require('../controllers/login');

router.post('/signup', hasUsername, signup);
router.post('/signin',signin);
router.get('/isSignin',isSignin);
router.get('/signout',signout);

module.exports = router;