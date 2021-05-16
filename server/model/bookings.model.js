const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  pnr: String,
  buyerName: String,
  buyerId: String,
  phoneNumber: String,
  tickets: [{ type: mongoose.Types.ObjectId, ref: 'Tickets' }],
  totalPrice: Number,
  additional: Schema.Types.Mixed,
  status: Boolean
}, { timestamps: true });

const bookingModel = mongoose.model('Bookings', ticketSchema, 'Bookings');

module.exports = {

}