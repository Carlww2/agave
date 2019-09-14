const Sequelize = require('sequelize');

const db = new Sequelize('test', 'postgres', process.env.DBPASSWORD, {
  host: 'localhost',
  dialect: 'postgres'
});

db.authenticate()
.then(() => console.log('DB connected!'))
.catch((error) => console.log(`DB connection error! - ${error}`))

module.exports = db