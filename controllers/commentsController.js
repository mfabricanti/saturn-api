
const db = require('../database/models');
const modelName = 'Comment';

module.exports = {
    getCommentsFromPost: (req, res, next) => {
        const query = {
            where: { postId: req.params.id },
            attributes: ["id", "userId", "postId", "description"]
        }

        db[modelName].findAll(query)
            .then((results) => db.formatResult(modelName, results, res))
            .catch((err => db.formatDBError(err, res)))
    },
    deleteComment: (req, res, next) => {
        const query = { where: { id: req.params.id } };

        db[modelName].destroy(query)
            .then(() => db.formatResult(modelName, {}, res, 204))
            .catch((err => db.formatDBError(err, res)))
    },
    addComment: (req, res, next) => {
        const query = {
            userId: req.body.userId,
            postId: req.body.postId,
            description: req.body.description
        };

        db[modelName].create(query)
            .then((results) => db.formatResult(modelName, { id: results.id }, res, 201))
            .catch((err => db.formatDBError(err, res)))

    }
}