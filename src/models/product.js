const Sequelize =  require('sequelize')
const db = require('../../db/connection')

const Product = db.define('product', {
    code: {
        type: Sequelize.STRING
    },
    name: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.DECIMAL
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
})

module.exports = Product