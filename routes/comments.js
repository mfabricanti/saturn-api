var express = require('express');
var router = express.Router();

const commentsController = require('../controllers/commentsController');

// GET COMMENTS FROM ONE POST
router.get('/post/:id', commentsController.getCommentsFromPost);

// DELETE A COMMENT
router.delete('/:id', commentsController.deleteComment);

// CREATE A COMMENT
router.post('/', commentsController.addComment);

module.exports = router;
