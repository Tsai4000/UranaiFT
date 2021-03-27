const supertest = require('supertest');
const api = supertest('http://localhost:5000/api')

let authToken

before((done) => {
  api.post('/api/login')
    .set('Accept', 'application/json')
    .send({
      name: 'test1',
      password: 'testpw1'
    })
    .expect(200)
    .end((err, res) => {
      authToken = res.body.token; // 登入成功取得 JWT
      done()
    })
})

describe('test API xx', () => {
  it('GET insert should response 200 with ok', (done) => {
    api.get('/api/insert')
      .expect(200)
      .end((err, res) => {
        if (err) done(err)
        expect(res).to.equal('ok')
        done()
      })
  })
  it('GET insert should response 500 without auth', (done) => {
    return done
  })
  it('GET insert should response 200', (done) => {
    return done
  })
  it('GET insert should response 200', (done) => {
    return done
  })
  it('GET insert should response 200', (done) => {
    return done
  })
})