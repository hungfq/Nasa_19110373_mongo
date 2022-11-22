const request = require('supertest')
const app = require('../app')


test("GET /planets", async () => {
  await request(app)
    .get('/planets')
    .expect('Content-Type', /json/)
    .expect(200)
    .then(response => {
      expect(Array.isArray(response.body)).toBeTruthy()
    })
})