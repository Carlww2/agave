const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect

chai.use(chaiHttp)

const app = require('../src/app')

describe('Server up', function() {
    it('Get /', function(done) {
        chai.request(app)
        .get('/')
        .set('Authorization', 'Bearer secret-token')
        .end((err, res) => {
            expect(res).to.have.status(200)
            expect(res.text).to.equal(res.text, 'This is an Agave Lab´s backend test')
            done()
        })
    })
})