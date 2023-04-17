const express = require('express');

const usersController = require('../controllers/users-controllers');
const router = express.Router();

router.post('/signup', usersController.signup);

router.post('/login', usersController.login);

router.post('/updatePlayer', usersController.updatePlayer);


module.exports = router;
