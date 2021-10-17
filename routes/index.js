var express = require('express');
var router = express.Router();

const indexController = require('../controllers/indexController');

router.get('/', indexController.getHealth);

router.get('/health', indexController.getHealth);

module.exports = router;
