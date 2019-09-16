const Sequelize =  require('sequelize')
const db = require('../../db/connection')

const OrderDetail = db.define('order_detail', {
    code: {
        type: Sequelize.STRING
    },
    quantity: {
        type: Sequelize.INTEGER
    },
    price: {
        type: Sequelize.NUMERIC
    },
    order_id: {
        type: Sequelize.INTEGER
    },
    subtotal: {
        type: Sequelize.NUMERIC
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
})

module.exports = OrderDetail