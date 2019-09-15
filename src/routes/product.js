const express = require('express')
const router = express.Router()
const Product = require('../models/product')
const passport = require('../passport')

router.get('/', passport.authenticate('bearer', { session: false }), async (req, res) => {
    try {
        const products = await Product.findAll()
        res.status(200).send(products)
    } catch (error) {
        res.status(500).send(`Error: ${error}`)
    }
})

router.get('/:id', passport.authenticate('bearer', { session: false }), async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id)
        if (!product) {
            product = []
        }
        res.status(200).send(product)
    } catch (error) {
        res.status(500).send(`Error: ${error}`)
    }
})

router.post('/', passport.authenticate('bearer', { session: false }), async (req, res) => {
    try {
        const product = await Product.create({...req.body});
        res.status(200).send(product)
    } catch (error) {
        res.status(500).send(`Error: ${error}`)
    }
})

router.patch('/:id', passport.authenticate('bearer', { session: false }), async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        product.update({...req.body})
        res.status(200).send(product)
    } catch (error) {
        res.status(500).send(`Error: ${error}`)
    }
})

router.delete('/:id', passport.authenticate('bearer', { session: false }), async (req, res) => {
    try {
        const product = await Product.destroy({
            where: {
               id: req.params.id
            }
        });
        if (!product) {
            res.status(404).send('Not found');
            return
        }
        res.sendStatus(204)
    } catch (error) {
        res.status(500).send(`Error: ${error}`)
    }
})

module.exports = router