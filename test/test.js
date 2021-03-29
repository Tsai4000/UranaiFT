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
        authToken = 'Bearer ' + res.body.token // get jwt
        done()
      })
  })

  it('GET insert should response 200 with ok', (done) => {
    api.get('/api/insert')
      .set('Authorization', authToken)
      .expect(200)
      .end((err, res) => {
        if (err) done(err)
        expect(res.body).to.have.keys(Object.entries(testMikuji.mikuji).map((([key, v]) => key)))
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
        expect(res.body).to.have.keys(Object.entries(testMikuji.mikuji).map((([key, v]) => key)))
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
      .send({ imgData: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAAAAACreq1xAAAEGklEQVRYCa3Bf2iUBRzH8ffnHOamzRylzs2mf1hJiGml+EeaWJqVRoos6VTqj6gVBEEJoZEmVPRPCCUElTipGFpkaJkjrIxUsrLMIPphdjcmY7qU5sx235577sfunue555479nqJCFbu6vhpc/dEohBl1Vz+bjYoJaIQZdmYf3CYiEKUMfN74TIRhSjDYobLRBQinIksE1GIUCZyTEQhwtiKD8gxEYUIsaD9WvJMRCFCWMzIMxGFKK392KsMMRGFKM1ixhATUYiSuuOdFDARhShl5KWYUcBEFCJQchKM66NQY9fY85QnAtiqXQSwC/WUJfxsy0aC2YHFlCF8bP9dlLJsz8KDhBJevScWEML23UMY4bGifTShjtbfQAhRbMXumBHuZM31RkmiyN17Y0Y5P/56PyWJQks+ERGcfOgIpYhCJiKx2z+nBDFEKRGR3XScYGLIW7fOICoTwcQQEzl7Zw62EGbZptkEEnnbejeQZWvbW98TYUwEEnkmsqYfnABdx5cSYszZkQQROS2nREbs7bWj+0k0iTCpab8RQOSYyDJcZ9reJ4yJACJr1EWR9c7qrm+WiVeeFmF2/P48fiLLRJ5x25fwxiMijFLCT2SZyGvs2vgCbdtMuK7qI9DP0/ETGfuXUGDKH3y2CBMuE4GWr1yHj8iwmFHAAJlwmQhmwke4uuOdFDEtX9V2AZeJYAOj8BEuixklxXcSrPHYJLxE2vgzwufjpWTEd5JRN+sripjwEmk2vgePv+stRkZ8Jxl/tlDMagbxEGkmij3z8pYNoy7h+mtuF67F+0Wx2n7hIdJMFLryPFMGuiecIQkTR4BwDY7Ay4SHcDzYcZkCXY0Is0MLB0lLNOMy4WPCQzhMDJl+kvPz1q9NTT1NRqIZxx0H2HMfXiY8hMNEjlI4Bmpt6imyEs3Aok5pXO+/V1DMhIdwmOr6ybJtj5G8OO2L+eQkmmHTc8Kx/qWbv6WQCQ/huOXovnvJqPulaVwfcE0POYlmBo7OJyMZW/cpQ0x4iLQbT7C9hjiwapeMYolmazlNluYcpuEcOSY8RFkH59ZSaMYPrR1kmfAQVTCRMWlDGx6iGiZc1nAOD1ENEy4TXqIarYeSpJnwEtVoIonjgc3X4SWq0UQSx381+IhqzEkmAaWEj6iGibSv5+EjqmHC8e6bnfiIaphwmPATVXiqIwHU9tbhJ6pgMQNMBBCVM5FmIoComAmX0XO5CS9RKbuzk7w47fDhw2fJExWac0R4Wf0FckSFLGb49Fy9u3UQl6iMiUBj+1IjSBMVMZF1qgWPmkEcohL2+Ou4+msnJwgkKhDf2kDa9nWvPUEJogImHKcnP7mVkkR0jy5YzY41zDtMCBFd+xrj2RcJJ6Kb9VEzZYlhJoaZGGZimIlhJobZ/97XPGCXluv4AAAAAElFTkSuQmCC' })
      .expect(200)
      .end((err, res) => {
        if (err) done(err)
        expect(res.body).to.have.keys(Object.entries(testMikuji.mikuji).map((([key, v]) => key)))
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
      .send({ imgData: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAAAAACreq1xAAAEGklEQVRYCa3Bf2iUBRzH8ffnHOamzRylzs2mf1hJiGml+EeaWJqVRoos6VTqj6gVBEEJoZEmVPRPCCUElTipGFpkaJkjrIxUsrLMIPphdjcmY7qU5sx235577sfunue555479nqJCFbu6vhpc/dEohBl1Vz+bjYoJaIQZdmYf3CYiEKUMfN74TIRhSjDYobLRBQinIksE1GIUCZyTEQhwtiKD8gxEYUIsaD9WvJMRCFCWMzIMxGFKK392KsMMRGFKM1ixhATUYiSuuOdFDARhShl5KWYUcBEFCJQchKM66NQY9fY85QnAtiqXQSwC/WUJfxsy0aC2YHFlCF8bP9dlLJsz8KDhBJevScWEML23UMY4bGifTShjtbfQAhRbMXumBHuZM31RkmiyN17Y0Y5P/56PyWJQks+ERGcfOgIpYhCJiKx2z+nBDFEKRGR3XScYGLIW7fOICoTwcQQEzl7Zw62EGbZptkEEnnbejeQZWvbW98TYUwEEnkmsqYfnABdx5cSYszZkQQROS2nREbs7bWj+0k0iTCpab8RQOSYyDJcZ9reJ4yJACJr1EWR9c7qrm+WiVeeFmF2/P48fiLLRJ5x25fwxiMijFLCT2SZyGvs2vgCbdtMuK7qI9DP0/ETGfuXUGDKH3y2CBMuE4GWr1yHj8iwmFHAAJlwmQhmwke4uuOdFDEtX9V2AZeJYAOj8BEuixklxXcSrPHYJLxE2vgzwufjpWTEd5JRN+sripjwEmk2vgePv+stRkZ8Jxl/tlDMagbxEGkmij3z8pYNoy7h+mtuF67F+0Wx2n7hIdJMFLryPFMGuiecIQkTR4BwDY7Ay4SHcDzYcZkCXY0Is0MLB0lLNOMy4WPCQzhMDJl+kvPz1q9NTT1NRqIZxx0H2HMfXiY8hMNEjlI4Bmpt6imyEs3Aok5pXO+/V1DMhIdwmOr6ybJtj5G8OO2L+eQkmmHTc8Kx/qWbv6WQCQ/huOXovnvJqPulaVwfcE0POYlmBo7OJyMZW/cpQ0x4iLQbT7C9hjiwapeMYolmazlNluYcpuEcOSY8RFkH59ZSaMYPrR1kmfAQVTCRMWlDGx6iGiZc1nAOD1ENEy4TXqIarYeSpJnwEtVoIonjgc3X4SWq0UQSx381+IhqzEkmAaWEj6iGibSv5+EjqmHC8e6bnfiIaphwmPATVXiqIwHU9tbhJ6pgMQNMBBCVM5FmIoComAmX0XO5CS9RKbuzk7w47fDhw2fJExWac0R4Wf0FckSFLGb49Fy9u3UQl6iMiUBj+1IjSBMVMZF1qgWPmkEcohL2+Ou4+msnJwgkKhDf2kDa9nWvPUEJogImHKcnP7mVkkR0jy5YzY41zDtMCBFd+xrj2RcJJ6Kb9VEzZYlhJoaZGGZimIlhJobZ/97XPGCXluv4AAAAAElFTkSuQmCC' })
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