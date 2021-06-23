const mongoose = require('mongoose');
const { nanoid } = require('nanoid');


const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  pnr: { type: String, default: () => nanoid(6).toUpperCase(6) },
  buyerName: String,
  buyerId: String,
  phoneNumber: String,
  tickets: [{ type: mongoose.Types.ObjectId, ref: 'Tickets' }],
  totalPrice: Number,
  additional: Schema.Types.Mixed,
  status: Boolean
}, { timestamps: true });

const bookingModel = mongoose.model('Bookings', bookingSchema, 'Bookings');

module.exports = {
  create: (booking) => {
    return bookingModel.create(booking);
  },
  find: (query) => {
    return bookingModel.find(query);
  },
  findById: (_id) => {
    return bookingModel.findById(_id);
  },
  update: async (_id, data) => {
    let booking = await bookingModel.findOne({ _id: _id });
    Object.assign(booking, data);
    return booking.save();
  },
  delete: (_id) => {
    return bookingModel.findByIdAndDelete(_id);
  },
  list: (perPage, page) => {
    return bookingModel.find()
      .limit(perPage)
      .skip(perPage * page).lean();
  }
}