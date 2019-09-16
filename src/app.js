const express = require('express')

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('This is an Agave Lab´s backend test')
})

app.use('/products', require('./routes/product'))
app.use('/orders', require('./routes/order'))

module.exports = app