const _Launch = require('../models/launches.model');

latestFlightNumber = 100;

const addNewLaunch = async (launch) => {
  latestFlightNumber++;
  await _Launch.create({
    ...launch,
    flightNumber: latestFlightNumber,
    custom: ['Nasa', 'Istro', 'SpaceX'],
    upcoming: true,
    success: true,
  })
}

const getAllLaunches = async () => {
  const launch = await _Launch.find({});
  return launch;
}

const existLaunchWithId = async (id) => {
  const launch = await _Launch.findOne({ flightNumber: id });
  return !!launch;
}

const abortLaunchById = async (id) => {
  const filter = {
    flightNumber: id,
  };
  const update = {
    upcoming: false,
    success: false,
  };
  const launchNew = await _Launch.findOneAndUpdate(filter, update, {
    new: true,
  });
  return launchNew;
}

module.exports = {
  getAllLaunches,
  addNewLaunch,
  existLaunchWithId,
  abortLaunchById,
}