
const db = require('../database/models');

module.exports = {
    getHealth: (req, res, next) => {
        db['User'].findAll()
            .then(() => {
                res.status(200).send("Database OK")
            })
            .catch((err => db.formatDBError(err, res)))
    },
}