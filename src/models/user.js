const Sequelize =  require('sequelize')
const db = require('../../db/connection')

const User = db.define('user', {
    name: {
        type: Sequelize.STRING
    },
    token: {
        type: Sequelize.STRING
    },
})

module.exports = User