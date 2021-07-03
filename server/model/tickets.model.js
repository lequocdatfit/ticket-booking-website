const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ticketSchema = new Schema(
  {
    flightId: { type: mongoose.Types.ObjectId, ref: "Flights" },
    passenger: String,
    passenderId: String,
    phoneNumber: String,
    email: String,
    address: String,
    dateOfBirth: Date,
    nationality: String,
    type: String,
    price: Number,
    seat: String,
    additionalBaggage: Number,
    additional: Schema.Types.Mixed,
    status: Boolean,
  },
  { timestamps: true }
);

const ticketModel = mongoose.model("Tickets", ticketSchema, "Tickets");

module.exports = {
  create: (ticket) => {
    return ticketModel.create(ticket);
  },
  find: (query) => {
    return ticketModel.find(query);
  },
  findById: (_id) => {
    return ticketModel.findById(_id);
  },
  update: async (_id, data) => {
    let ticket = await ticketModel.findOne({ _id: _id });
    Object.assign(ticket, data);
    return ticket.save();
  },
  delete: (_id) => {
    return ticketModel.findByIdAndDelete(_id);
  },
  list: (perPage, page) => {
    return ticketModel
      .find()
      .limit(perPage)
      .skip(perPage * page)
      .lean();
  },
};
