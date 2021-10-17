var express = require('express');
const multer = require('multer');

var router = express.Router();
const upload = multer();

const usersController = require('../controllers/usersController');

// GET ALL USERS
// Parameters: fullName
router.get('/', usersController.getAllUsers);

// GET ONE USER
router.get('/:id', usersController.getOneUser);

// CREATE A USER
router.post('/', usersController.createAccount);

// DELETE A USER
router.delete('/:id', usersController.inativacteAccount);

// UPDATE A USER
router.put('/:id', usersController.updateAccount);

// UPDATE A USER
router.put('/:id/photo', upload.single('photo'), usersController.addPhoto);

module.exports = router;
