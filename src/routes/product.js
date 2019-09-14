const express = require('express')
const router = express.Router()
const Product = require('../models/product')

router.get('/', async (req, res) => {
    try {
        const products = await Product.findAll()
        res.status(200).send(products)
    } catch (error) {
        res.status(500).send(`Error: ${error}`)
    }
})

router.get('/:id', async (req, res) => {
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

router.post('/', async (req, res) => {
    try {
        const product = await Product.create({...req.body});
        res.status(200).send(product)
    } catch (error) {
        res.status(500).send(`Error: ${error}`)
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        product.update({...req.body})
        res.status(200).send(product)
    } catch (error) {
        res.status(500).send(`Error: ${error}`)
    }
})

module.exports = router