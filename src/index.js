const app = require('./app')
const port = process.env.PORT

require('../db/connection')

app.listen(port, () => {
    console.log(`> Server is up on port ${port}`)
})