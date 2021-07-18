const router = require("express").Router();
const usersController = require('../controllers/usersController');
const auth = require('../middleware/auth');

router.post('/login', usersController.login);

router.post('/register', usersController.register);

router.get('/', auth, usersController.userInfo);


module.exports = router;
