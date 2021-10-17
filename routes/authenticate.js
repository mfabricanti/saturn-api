var express = require('express');
var router = express.Router();

const authenticateController = require('../controllers/authenticateController');

// LOGIN A USER
router.post('/login', authenticateController.login);

// LOGOUT A USER
router.post('/logout', authenticateController.logout);


module.exports = router;
