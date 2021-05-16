const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const airlinerSchema = new Schema({
  model: String,
  manufacturer: String,
  dateOfCommissioning: Date,
  seatLayout: String,
  seatPitch: [{ seatType: String, seatPitch: Number }],
  passengerCapacity: [{ seatType: String, amount: Number }],
  additional: Schema.Types.Mixed,
});

const airlineModel = mongoose.model('Airliners', airlinerSchema, 'Airliners');

module.exports = {
  create: (flight) => {
    return airlineModel.create(flight);
  },
  find: (query) => {
    return airlineModel.find(query);
  },
  findById: (_id) => {
    return airlineModel.findById(_id);
  },
  update: (_id) => {
    return airlineModel.findByIdAndUpdate(_id);
  },
  delete: (_id) => {
    return airlineModel.findByIdAndDelete(_id);
  }
}