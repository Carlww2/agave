const Sequelize = require('sequelize');
let = database = 'agave'

if (process.env.NODE_ENV === 'test') {
    database = 'test'
}

const db = new Sequelize(database, 'postgres', process.env.DBPASSWORD, {
    host: 'localhost',
    dialect: 'postgres'
});

db.authenticate()
.then(() => console.log('DB connected!'))
.catch((error) => console.log(`DB connection error! - ${error}`))

module.exports = db