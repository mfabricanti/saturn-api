
const db = require('../database/models');
const modelName = 'Post';
const { findUser } = require('./usersController');

module.exports = {
    getAllPosts: (req, res, next) => {
        let query = {}

        db[modelName].findAll(query)
            .then((results) => db.formatResult(modelName, results, res))
            .catch((err => db.formatDBError(err, res)))
    },
    getPostsFromUser: (req, res, next) => {
        const query = {
            where: { userId: req.params.id },
            attributes: ["id", "userId", "photoId", "description"]
        }

        db[modelName].findAll(query,)
            .then((results) => db.formatResult(modelName, results, res))
            .catch((err => db.formatDBError(err, res)))
    },
    deletePost: (req, res, next) => {
        const query = { where: { id: req.params.id } };

        db[modelName].destroy(query)
            .then(() => db.formatResult(modelName, {}, res, 204))
            .catch((err => db.formatDBError(err, res)))
    },
    addPost: async (req, res, next) => {
        let photo_id = await addPhoto(req, res);
        if (photo_id === 'notfound') {
            await db.formatResult('User', null, res, 404)
            return
        }

        const query = {
            userId: req.body.userId,
            photoId: photo_id.photoId,
            description: req.body.description
        };

        db[modelName].create(query)
            .then((results) => db.formatResult(modelName, results, res, 201))
            .catch((err => db.formatDBError(err, res)))

    },
    getFeed: async (req, res, next) => {
        await db[modelName].findAll({
            include: ['UserPost', 'PhotoPost'],
            order: [['id', 'DESC']],

        })
            .then(async (results) => {
                results_formatted = []

                for (const item of results) {

                    results_formatted.push({
                        id: item.id,
                        userId: item.userId,
                        description: item.description,
                        photoId: item.photoId,
                        createdAt: item.createdAt,
                        updatedAt: item.updatedAt,
                        User: {
                            nickname: item.UserPost.nickname,
                            photo: item.UserPost.photoId,
                        },
                        Photo: {
                            photo: item.PhotoPost.photo,
                            mimetype: item.PhotoPost.mimetype,
                        }
                    })
                }

                return db.formatResult(modelName, results_formatted, res, 200)
            })
            .catch((err => db.formatDBError(err, res)))
    }
}

const addPhoto = async (req, res) => {
    // Verifica se o usuario existe
    let user_found = await findUser(req.body.userId).catch(err => { console.log(err); db.formatDBError(err, res) })
    if (!user_found) return 'notfound'

    const query = {
        photo: req.file.buffer,
        mimetype: req.file.mimetype
    };

    // Salva a foto
    return await db['Photo'].create(query)
        .then(async (results) => ({ photoId: results.id }))
        .catch(err => db.formatDBError(err, res))
};