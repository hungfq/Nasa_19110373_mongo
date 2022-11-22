const supertest = require('supertest')
const app = require('../app')


test("GET /launches", async () => {
  await supertest(app)
    .get('/launches')
    .expect('Content-Type', /json/)
    .expect(200)
    .then(async (response) => {
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body[0].flightNumber).toBe(100);
    })
})


test("POST /launches", async () => {
  const data = {
    mission: "ZTM111",
    rocket: "ZTM IS1",
    target: "Kepler-186 f",
    launchDate: "January 18, 2033"
  }

  await supertest(app)
    .post('/launches')
    .send(data)
    .expect(201)
    .then(async (response) => {
      expect(response.body.mission).toBe(data.mission);
      expect(response.body.rocket).toBe(data.rocket);
      expect(response.body.target).toBe(data.target);
    })
})


test("DELETE /launches", async () => {
  const id = 100;

  await supertest(app)
    .delete('/launches/' + id)
    .expect(200)
    .then(async (response) => {
      expect(response.body.upcoming).toBe(false);
    })
})