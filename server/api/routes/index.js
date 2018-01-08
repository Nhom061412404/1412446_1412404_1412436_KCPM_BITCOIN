var express = require('express');
var router = express.Router();
var UserController = require('../controllers/UserController');
const passport = require('passport');

router.get('/', (req, res, next) => {
  res.send({msg: 'OK'});
});

const ret = passport.authenticate('jwt', { session: false });

router.post('/signup', UserController.createUser);
router.post('/authenticate', UserController.authenticate);
router.get('/userinfo', ret, UserController.userinfo);
router.get('/forgotPassword', ret, UserController.forgotPassword);
router.post('/resetPassword', ret, UserController.resetPassword);
router.post('/activeAccount', UserController.activeAccount);

router.get('/test', (req, res) => {
  console.log(process.env.NODE_ENV);
})

module.exports = router;