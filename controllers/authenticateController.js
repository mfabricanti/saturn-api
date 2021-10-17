
const bcrypt = require('bcryptjs');
const db = require('../database/models');

module.exports = {
    login: (req, res, next) => {
        const query = { where: { nickname: req.body.nickname } }

        db['User'].findOne(query)
            .then((userData) => {

                if (userData && (bcrypt.compareSync(req.body.password, userData.password))) {
                    res.cookie('nickname', req.body.nickname)
                    res.cookie('userId', userData.id)
                    res.redirect('/feed')
                } else {
                    req.session.destroy();
                    res.render('index', { invalid_login: true })
                }

            })
            .catch((err => db.formatDBError(err, res)))

    },
    logout: (req, res, next) => {
        req.session.destroy();
        res.redirect('/')
    },
    checkSession: (req, res, next) => {
        if (req.session.userId) {
            next()
        } else {
            res.render('index');
            res.status(401).send('Not authorized');
        }
    },
}