const {
  getAllLaunches,
  addNewLaunch,
  existLaunchWithId,
  abortLaunchById,
} = require('../../service/launch.service')

async function httpGetAllLaunches(req, res) {
  const launch = await getAllLaunches();
  return res.status(200).json(launch);
}

async function httpAddNewLaunch(req, res) {
  const launch = req.body;

  if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
    res.status(400).json({
      error: 'Missing required launch property',
    });
  }

  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    res.status(400).json({
      error: 'Invalid launch date',
    });
  };

  await addNewLaunch(launch);
  return res.status(201).json(launch);
};

async function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id);

  const isExist = await existLaunchWithId(launchId);
  if (!isExist) {
    return res.status(404).json({
      error: 'Launch not found',
    });

  }

  const aborted = await abortLaunchById(launchId);
  return res.status(200).json(aborted);
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};