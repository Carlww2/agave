const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect

chai.use(chaiHttp)

const app = require('../src/app')

describe('Products API', function() {
    it('Get products correct', function(done) {
        chai.request(app)
        .get('/products')
        .set('Authorization', 'Bearer secret-token')
        .end((err, res) => {
            expect(res).to.have.status(200)
            expect(res.body).to.be.a('array')
            done()
        })
    })

    it('Get products incorrect', function(done) {
        chai.request(app)
        .get('/productss')
        .set('Authorization', 'Bearer secret-token')
        .end((err, res) => {
            expect(res).to.have.status(404)
            done()
        })
    })

    it('Get one product with valid id', function(done) {
        chai.request(app)
        .get('/products/1')
        .set('Authorization', 'Bearer secret-token')
        .end((err, res) => {
            expect(res).to.have.status(200)
            expect(res.body).to.be.a('object')
            done()
        })
    })

    it('Get one product with invalid id', function(done) {
        chai.request(app)
        .get('/products/4')
        .set('Authorization', 'Bearer secret-token')
        .end((err, res) => {
            expect(res).to.have.status(404)
            done()
        })
    })

    it('Store a product with complete data', function(done) {
        chai.request(app)
        .post('/products')
        .set('Authorization', 'Bearer secret-token')
        .send({
            'code': 'SOCK',
            'name': 'Socks',
            'price': '2'
        })
        .end((err, res) => {
            expect(res).to.have.status(201)
            expect(res.body).to.be.a('object')
            done()
        })
    })

    it('Store a product with incomplete data', function(done) {
        chai.request(app)
        .post('/products')
        .set('Authorization', 'Bearer secret-token')
        .send({
            'code': 'SOCK'
        })
        .end((err, res) => {
            expect(res).to.have.status(500)
            done()
        })
    })

    // Incrementar manualmente el id por cada prueba ejecutada (por le momento)
    it('Update a product with some fields', function(done) {
        chai.request(app)
        .put('/products/17')
        .set('Authorization', 'Bearer secret-token')
        .send({
            'price': 4.0
        })
        .end((err, res) => {
            expect(res).to.have.status(200)
            expect(res.body).to.be.a('object')
            done()
        })
    })

    // Incrementar manualmente el id por cada prueba ejecutada (por le momento)
    it('Update a product without fields', function(done) {
        chai.request(app)
        .put('/products/17')
        .set('Authorization', 'Bearer secret-token')
        .end((err, res) => {
            expect(res).to.have.status(400)
            expect(res.body).to.be.a('object')
            done()
        })
    })

    // Incrementar manualmente el id por cada prueba ejecutada (por le momento)
    it('Delete a product', function(done) {
        chai.request(app)
        .delete('/products/17')
        .set('Authorization', 'Bearer secret-token')
        .end((err, res) => {
            expect(res).to.have.status(204)
            expect(res.body).to.be.a('object')
            done()
        })
    })

    // Incrementar manualmente el id por cada prueba ejecutada (por le momento)
    it('Delete a product already deleted', function(done) {
        chai.request(app)
        .delete('/products/17')
        .set('Authorization', 'Bearer secret-token')
        .end((err, res) => {
            expect(res).to.have.status(404)
            expect(res.body).to.be.a('object')
            done()
        })
    })
})