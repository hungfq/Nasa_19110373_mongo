const { parse } = require('csv-parse');
const fs = require('fs');
const _Planet = require('../models/planets.model');

const habitablePlanets = [];

function isHabitablePlanet(planet) {
  return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
}

function loadData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream('../server/data/kepler_data.csv')
      .pipe(parse({
        comment: '#',
        columns: true,
      }))
      .on('data', async (data) => {
        if (isHabitablePlanet(data)) {
          const checkExist = await _Planet.findOne({ kepid: data.kepid });
          if (!checkExist) await _Planet.create(data)
        }
      })
      .on('error', (err) => {
        console.log(err);
      })
      .on('end', () => {
        console.log(
          `${habitablePlanets.length} habitable planets found!`
        );

        resolve(habitablePlanets);
      });
  })
}

async function getAllPlanets() {
  const listAll = await _Planet.find({});
  return listAll;
}

module.exports = {
  loadData,
  getAllPlanets,
}