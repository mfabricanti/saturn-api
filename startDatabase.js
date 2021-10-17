const { sequelize } = require("./database/models");
const db = require("./database/models");

// TABLES
// const tablesToSync = ['User', 'Post', 'Comment', 'Like'];

// (async function () {
//     for await (const item of tablesToSync) {
//         console.log('Sync ' + item)
//         await db[item].sync({ alter: true });

//         console.log(db[item].associations)
//     }
// })();

(async function () {
    await db['sequelize']
        .sync({ alter: true })
        .then((results) => console.log('Database initialized correctly'))
        .catch((err) => { db.formatDBError(err) });
})();
