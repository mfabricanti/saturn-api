'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};
const defaultObject = { status: () => { return { send: () => { return null } } }, };

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.formatResult = (model, results, res, statusCode = 200) => {

  if (statusCode === 204) {
    res.status(statusCode).send()
  } else if (statusCode === 404 || results === null || ((Array.isArray(results) && results.length === 0))) {
    res.status(404).send(model + " not found")
  } else if (Array.isArray(results) && results.length > 0) {
    res.status(statusCode).send(results)
  } else if (!Array.isArray(results) && results) {
    res.status(statusCode).send(results)
  } else {
    res.status(500).send("Unexpected error")
  }
}

db.formatDBError = (err, res = defaultObject) => {

  const defaultError = (err, res) => {
    res.status(500).send('Internal server error');
    console.error('Internal server error');
    console.log(JSON.stringify(err, null, 2));
  }

  if (err && err.name) {

    switch (err.name) {
      case 'SequelizeUniqueConstraintError':
        const errorToShow = `${err.errors[0].path.split(".")[1]} ${err.errors[0].value} já escolhido`
        res.status(409).send(errorToShow);
        break;

      case 'SequelizeValidationError':
        res.status(409).send(`${err.errors[0].path} não existe`);
        break;

      case 'SequelizeForeignKeyConstraintError':
        res.status(409).send(`${err.fields[0]} ${err.value} não existe`);
        break;

      case 'SequelizeConnectionRefusedError':
        res.status(500).send('Database unavailable');
        console.error('Start the database first')
        console.log('docker run --name mydb -e MYSQL_ROOT_PASSWORD=secretpass --rm -p 3306:3306 -d mysql:latest')
        break;

      case 'SequelizeConnectionError':
        switch (err.parent.code) {
          case 'ER_BAD_DB_ERROR':
            res.status(500).send('database running but not created');
            console.error('You need to run: npx sequelize db:create');
            break;
          case 'PROTOCOL_CONNECTION_LOST':
            res.status(500).send('Wait for database start');
            console.error('Wait for database start');
            break;
          default:
            defaultError(err, res);
        }
        break;

      case 'SequelizeDatabaseError':
        switch (err.parent.code) {
          case 'ER_NO_SUCH_TABLE':
            res.status(500).send('Sync database not runned');
            console.error('You need to run: node startDatabase.js');
            break;
          default:
            defaultError(err, res);
        }
        break;

      default:
        defaultError(err, res);
    }
  }

}



module.exports = db;
