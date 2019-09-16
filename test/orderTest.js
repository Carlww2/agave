const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect

chai.use(chaiHttp)

const app = require('../src/app')

describe('Store orders', function() {
    it('Successful store', function(done) {
        chai.request(app)
        .post('/orders')
        .set('Authorization', 'Bearer secret-token')
        .send({
            'items': [
                "TSHIRT", "TSHIRT", "TSHIRT", "PANTS", "TSHIRT"
            ]
        })
        .end((err, res) => {
            expect(res).to.have.status(201)
            expect(res.body).to.be.a('object')
            expect(res.body).equal(res.body, '{ total: 81 }', `${res.body.total} = 81`)
            done()
        })
    })

    it('unsuccessful store', function(done) {
        chai.request(app)
        .post('/orders')
        .set('Authorization', 'Bearer secret-token')
        .send({
            'items': []
        })
        .end((err, res) => {
            expect(res).to.have.status(400)
            done()
        })
    })
})