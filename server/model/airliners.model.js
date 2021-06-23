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
  update: async (_id, data) => {
    let airliner = await airlineModel.findOne({ _id: _id });
    Object.assign(airliner, data);
    return airliner.save();
  },
  delete: (_id) => {
    return airlineModel.findByIdAndDelete(_id);
  }
}