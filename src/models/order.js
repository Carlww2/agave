const Sequelize =  require('sequelize')
const db = require('../../db/connection')

const Order = db.define('order', {
    total: {
        type: Sequelize.STRING
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
})

module.exports = Order