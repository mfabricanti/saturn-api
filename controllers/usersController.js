
const db = require('../database/models');
const bcrypt = require('bcryptjs');
const modelName = 'User';

const user_attributes = ["id", "fullName", "nickname", "biography", "photoId", "createdAt", "updatedAt"]

const findUser = async (id) => {
    const query = {
        where: { id },
        attributes: user_attributes
    }

    return await db[modelName].findOne(query).then((results) => results)
}

module.exports = {
    getAllUsers: (req, res, next) => {
        let query = {
            attributes: user_attributes
        }

        if (req.query.fullName) {
            query.where = {
                fullName: {
                    [db.Sequelize.Op.like]: `%${req.query.fullName}%`
                }
            }
        }

        db[modelName].findAll(query)
            .then((results) => db.formatResult(modelName, results, res))
            .catch((err => db.formatDBError(err, res)))
    },
    getOneUser: (req, res, next) => {
        const query = {
            where: { id: req.params.id },
            attributes: user_attributes
        }

        db[modelName].findOne(query)
            .then((results) => db.formatResult(modelName, results, res))
            .catch((err => db.formatDBError(err, res)))
    },
    inativacteAccount: (req, res, next) => {
        const query = { where: { id: req.params.id } };

        db[modelName].destroy(query)
            .then((result) => db.formatResult(modelName, null, res, (result === 1) ? 204 : 404))
            .catch((err => db.formatDBError(err, res)))
    },
    createAccount: (req, res, next) => {
        //todo: colocar validators em todas os paths

        const query = {
            fullName: req.body.fullName,
            nickname: req.body.nickname,
            password: bcrypt.hashSync(req.body.password, 10),
            email: req.body.email,
        };

        db[modelName].create(query)
            .then((results) => {
                if (results.id) {
                    res.status(201).send({ id: results.id })
                }
            })
            .catch((err => db.formatDBError(err, res)))

    },
    updateAccount: (req, res, next) => {
        const query = {
            where: { id: req.params.id }
        };

        let object = {}
        const allowed_fields = ['fullName', 'nickname', 'biography', 'password', 'email']

        Object.keys(req.body).map((k) => {
            if (allowed_fields.includes(k)) {
                Object.defineProperty(object, k, { value: req.body[k], enumerable: true, writable: true })
            }
        })

        db[modelName].update(object, query)
            .then((results) => db.formatResult(modelName, null, res, (results[0] === 0) ? 404 : 204))
            .catch((err => db.formatDBError(err, res)))
    },
    addPhoto: async (req, res, next) => {

        // Verifica se o usuario existe
        let user_found = await findUser(req.params.id).catch(err => db.formatDBError(err, res))
        if (!user_found) {
            db.formatResult(modelName, null, res, 404)
            return
        }

        const query = {
            photo: req.file.buffer,
            mimetype: req.file.mimetype
        };

        // Salva a foto
        await db['Photo'].create(query)
            .then(async (results) => {
                const query2 = {
                    where: { id: req.params.id }
                };

                const object = {
                    photoId: results.id
                }

                // Atualiza o usuario com o ID da photo
                await db[modelName].update(object, query2)
                    .then(() => db.formatResult(modelName, { photoId: results.id }, res, 201))

            })
            .catch(err => db.formatDBError(err, res))
    },
    findUser
}