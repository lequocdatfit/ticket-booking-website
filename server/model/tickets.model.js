const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  fightId: { type: mongoose.Types.ObjectId, ref: 'Flights' },
  passenger: String,
  passenderId: String,
  phoneNumber: String,
  type: String,
  price: Number,
  seat: String,
  additionalBaggage: Number,
  additional: Schema.Types.Mixed,
  status: Boolean
}, { timestamps: true });

const ticketModel = mongoose.model('Tickets', ticketSchema, 'Tickets');

module.exports = {
  create: (ticket) => {
    return ticketModel.create(ticket);
  },
  find: (query) => {
    return ticketModel.find(query).populate();
  },
  findById: (_id) => {
    return ticketModel.findById(_id).populate();
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
    return ticketModel.find()
      .limit(perPage)
      .skip(perPage * page).lean();
  }
}