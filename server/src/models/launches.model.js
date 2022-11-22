const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


const LaunchSchema = new Schema({
  flightNumber: Number,
  mission: String,
  rocket: String,
  launchDate: Date,
  target: String,
  customer: [],
  upcoming: {
    type: Boolean,
    default: true,
  },
  success: {
    type: Boolean,
    default: true,
  }
});

const Launch = mongoose.model('Launch', LaunchSchema);
module.exports = Launch;