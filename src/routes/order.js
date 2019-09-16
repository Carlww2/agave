const express = require('express')
const router = express.Router()
const Product = require('../models/product')
const Order = require('../models/order')
const OrderDetail = require('../models/orderDetail')
const passport = require('../passport')
const _ = require('lodash');

router.get('/', passport.authenticate('bearer', { session: false }), async (req, res) => {
    try {
        const orders = await Order.findAll()
        res.status(200).send(orders)
    } catch (error) {
        res.status(500).send(`Error: ${error}`)
    }
})

router.get('/:id', passport.authenticate('bearer', { session: false }), async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id)
        if (!order) {
            order = []
        }
        // Refactor for use of relations!
        const items = await OrderDetail.findAll({
            where: {
                order_id: order.id,
            }
        });
        res.status(200).send({order, items})
    } catch (error) {
        res.status(500).send(`Error: ${error}`)
    }
})

router.post('/', passport.authenticate('bearer', { session: false }), async (req, res) => {
    let total = 0;
    const items = {};
    try {
        req.body.items.forEach(i => items[i] = (items[i] || 0) + 1)
        
        const entries = Object.entries(items)
        const order = await Order.create({total});

        entries.forEach(async function(item) {
            const code = item[0]
            const quantity = item[1]
            let subtotal = 0

            const product = await Product.findOne({where: {code}});
            
            if (product) {
                // Check promotions!
                if (product.code === 'PANTS') {
                    const q = quantity / 2
                    if (q % 1 === 0) {
                        subtotal = (q * product.price)
                    } else {
                        subtotal = (Math.floor(q) * product.price) + product.price
                    }
                } else if (product.code === 'TSHIRT' && quantity >= 3) {
                    subtotal = (product.price - 1) * quantity
                } else {
                    subtotal = product.price * quantity
                }

                await OrderDetail.create({
                    code: product.code,
                    price: product.price,
                    quantity,
                    subtotal,
                    order_id: order.id
                })
                total += subtotal
                await order.update({total: parseFloat(total)})
            }
        })
        // Preguntar por una mejor solución / alternativa
        setTimeout(() => {
            res.send({total: order.total})
        }, 100);
    } catch (error) {
        res.status(500).send(`Error: ${error}`)
    }
})

module.exports = router