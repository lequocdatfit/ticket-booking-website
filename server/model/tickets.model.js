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

}