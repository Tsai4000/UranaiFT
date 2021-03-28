const supertest = require('supertest');
const api = supertest('http://localhost:5000')
const expect = require('expect.js');
let authToken

const testMikuji = {
  mikuji: {
    fortune: "Big",
    overview: "運氣不錯喔",
    wish: "心想事成",
    wait: "會遇到貴人",
    lost: "會在某處尋找到遺失物",
    travel: "不宜旅行 恐有血光之災",
    bussiness: "扶搖直上",
    knowedge: "專注所學 功成將至",
    arguement: "或許會有紛爭，無關對錯",
    love: "會出現",
    fate: "毫無影響",
    house: "無問題，大動也可",
    sick: "健康無事"
  }
}

describe('test API xx', () => {

  before((done) => {
    api.post('/api/login')
      .set('Accept', 'application/json')
      .send({
        name: 'test1',
        password: 'testpw1'
      })
      .expect(200)
      .end((err, res) => {
        authToken = res.body.token // get jwt
        done()
      })
  })

  it('GET insert should response 200 with ok', (done) => {
    api.get('/api/insert')
      .set('Authorization', authToken)
      .expect(200)
      .end((err, res) => {
        if (err) done(err)
        expect(res.text).to.equal('ok')
        done()
      })
  })
  it('GET insert should response 401 without auth', (done) => {
    api.get('/api/insert')
      .expect(401)
      .end((err, res) => {
        if (err) done(err)
        expect(res.body.msg).to.equal('No token provided.')
        done()
      })
  })
  it('POST insert should response 200', (done) => {
    api.post('/api/insert')
      .set('Accept', 'application/json')
      .set('Authorization', authToken)
      .send(testMikuji)
      .expect(200)
      .end((err, res) => {
        if (err) done(err)
        expect(res.text).to.equal('ok')
        done()
      })
  })
  it('POST insert should response 400 with wrong body', (done) => {
    api.post('/api/insert')
      .set('Content-Type', 'application/json')
      .set('Authorization', authToken)
      .send({ wrong: "wrong" })
      .expect(400)
      .end((err, res) => {
        if (err) done(err)
        expect(res.body.msg).to.equal('Bad request')
        done()
      })
  })
  it('POST insert should response 401 without auth', (done) => {
    api.post('/api/insert')
      .set('Accept', 'application/json')
      .send(testMikuji)
      .expect(401)
      .end((err, res) => {
        if (err) done(err)
        expect(res.body.msg).to.equal('No token provided.')
        done()
      })
  })
  it('POST insert_AI should response 200', (done) => {
    api.post('/api/insert_AI')
      .set('Accept', 'application/json')
      .set('Authorization', authToken)
      .send({ imgdata: 'testdata' })
      .expect(200)
      .end((err, res) => {
        if (err) done(err)
        expect(res.text).to.equal('ok')
        done()
      })
  })
  it('POST insert_AI should response 401 without auth', (done) => {
    api.post('/api/insert_AI')
      .set('Accept', 'application/json')
      .send({ imgdata: 'testdata' })
      .expect(401)
      .end((err, res) => {
        if (err) done(err)
        expect(res.body.msg).to.equal('No token provided.')
        done()
      })
  })
  it('GET mikuji should response 200 with correct body', (done) => {
    api.get('/api/mikuji')
      .expect(200)
      .end((err, res) => {
        if (err) done(err)
        expect(res.body).to.have.keys(Object.entries(testMikuji.mikuji).map((([key, v]) => key)))
        done()
      })
  })
  it('POST mikuji should response 200 with correct body', (done) => {
    api.post('/api/mikuji')
      .set('Accept', 'application/json')
      .send({ imgData: 'testdata' })
      .expect(200)
      .end((err, res) => {
        if (err) done(err)
        expect(res.body).to.have.keys(Object.entries(testMikuji.mikuji).map((([key, v]) => key)))
        done()
      })
  })
  it('POST mikuji should response 400 with wrong body', (done) => {
    api.post('/api/mikuji')
      .set('Accept', 'application/json')
      .send({ wrong: 'wrongdata' })
      .expect(400)
      .end((err, res) => {
        if (err) done(err)
        done()
      })
  })
})