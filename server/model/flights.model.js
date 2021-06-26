const mongoose = require("mongoose");
const nanoid = require("nanoid");
const Schema = mongoose.Schema;

const flightSchema = new Schema({
  flightId: {
    type: String,
    require: true,
    default: () => nanoid.nanoid(6).toUpperCase(),
  },
  airliner: { type: Schema.Types.ObjectId, ref: "Airliners" },
  takeOffTime: Date,
  landingTime: Date,
  startFrom: { type: Schema.Types.ObjectId, ref: "Airports" },
  destination: { type: Schema.Types.ObjectId, ref: "Airports" },
  type: String,
  price: Schema.Types.Mixed,
  // cabinFuselage: [
  //   {
  //     index: Number,
  //     type: String,
  //     rows: [
  //       {
  //         rowIndex: Number,
  //         seats: [
  //           {
  //             id: String,
  //             occupied: { type: Boolean, default: false },
  //           },
  //         ],
  //       },
  //     ],
  //     columns: Number,
  //   },
  // ],
  cabinFuselage: Schema.Types.Mixed,
  seat: [{ seatType: String, amount: Number }],
  additional: Schema.Types.Mixed,
});

const flightModel = mongoose.model("Flights", flightSchema, "Flights");

module.exports = {
  create: (flight) => {
    return flightModel.create(flight);
  },
  find: (query) => {
    return flightModel
      .find(query)
      .populate()
      .populate("airliner")
      .populate("startFrom")
      .populate("destination");
  },
  findById: (_id) => {
    return flightModel
      .findById(_id)
      .populate("airliner")
      .populate("startFrom")
      .populate("destination");
  },
  update: async (_id, data) => {
    let flight = await flightModel.findOne({ _id: _id });
    Object.assign(flight, data);
    return flight.save();
  },
  delete: (_id) => {
    return flightModel.findByIdAndDelete(_id);
  },
  list: (perPage, page) => {
    return flightModel
      .find()
      .populate("airliner")
      .populate("startFrom")
      .populate("destination")
      .limit(perPage)
      .skip(perPage * page);
  },
  aggregate: (agg) => {
    return flightModel.aggregate(agg);
  },
};
