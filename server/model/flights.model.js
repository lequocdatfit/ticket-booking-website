const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const flightSchema = new Schema({
  flightId: { type: String, require: true, unique: true },
  airliner: { type: Schema.Types.ObjectId, ref: 'Airliners' },
  takeOffTime: Date,
  landingTime: Date,
  startFrom: { type: Schema.Types.ObjectId, ref: 'Airports' },
  destination: { type: Schema.Types.ObjectId, ref: 'Airports' },
  type: String,
  price: Schema.Types.Mixed,
  seat: [{ seatType: String, amount: Number }],
  additional: Schema.Types.Mixed,
});

const flightModel = mongoose.model('Flights', flightSchema, 'Flights');

module.export = {
  create: (flight) => {
    return flightModel.create(flight);
  },
  find: (query) => {
    return flightModel.find(query).populate();
  },
  findById: (_id) => {
    return flightModel.findById(_id).populate();
  },
  update: (_id) => {
    return flightModel.findByIdAndUpdate(_id);
  },
  delete: (_id) => {
    return flightModel.findByIdAndDelete(_id);
  }
}