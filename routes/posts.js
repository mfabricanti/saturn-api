var express = require('express');
const multer = require('multer');

var router = express.Router();
const upload = multer();

const postsController = require('../controllers/postsController');

// GET ALL POSTS
router.get('/', postsController.getAllPosts);

// GET POSTS FROM ONE USER
router.get('/user/:id', postsController.getPostsFromUser);

// DELETE A POST
router.delete('/:id', postsController.deletePost);

// CREATE A POST
router.post('/', upload.single('photo'), postsController.addPost);

// GET ALL POSTS W/ PHOTOS
router.get('/feed', postsController.getFeed);

module.exports = router;
