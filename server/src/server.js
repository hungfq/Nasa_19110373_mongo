const mongoose = require('mongoose');
const http = require('http');

const app = require('./app');

const { loadData } = require('./service/planet.service');

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

const { mongoUrl } = require('../mongo_config')
const _Launch = require('./models/launches.model');

async function startServer() {
  await loadData();
  await initLaunches();
  server.listen(PORT, () => {
    console.log(`Listening on ${PORT}...`);
  });
}

const initLaunches = async () => {
  const checkExists = await _Launch.findOne({ flightNumber: 100 });
  if (!checkExists) {
    const launch = await _Launch.create({
      flightNumber: 100,
      mission: 'keep Exploration x',
      rocket: 'Exploration IS1',
      launchDate: new Date("11-27-2030"),
      target: 'Kepler 442 b',
      customer: ['Nasa', 'Istro'],
      upcoming: true,
      success: true,
    });
  }
};

mongoose.Promise = global.Promise;
mongoose.connect(mongoUrl, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected Mongo')
  })
  .catch((err) => console.log(err));


startServer();
// ....