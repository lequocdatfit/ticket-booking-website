const mongoose = require("mongoose");
const { nanoid } = require("nanoid");

const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    pnr: { type: String, default: () => nanoid(6).toUpperCase(6) },
    buyerName: String,
    buyerId: String,
    phoneNumber: String,
    email: String,
    address: String,
    dateOfBirth: Date,
    nationality: String,
    tickets: [{ type: mongoose.Types.ObjectId, ref: "Tickets" }],
    totalPrice: Number,
    additional: Schema.Types.Mixed,
    status: Boolean,
  },
  { timestamps: true }
);

const bookingModel = mongoose.model("Bookings", bookingSchema, "Bookings");

module.exports = {
  create: (booking) => {
    return bookingModel.create(booking);
  },
  find: (query) => {
    return bookingModel.find(query).populate({
      path: "tickets",
      populate: {
        path: "flightId",
        populate: {
          path: "startFrom destination",
        },
      },
    });
  },
  findById: (_id) => {
    return bookingModel.findById(_id).populate({
      path: "tickets",
      populate: {
        path: "flightId",
        populate: {
          path: "startFrom destination",
        },
      },
    });
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
    return bookingModel
      .find()
      .populate({
        path: "tickets",
        populate: {
          path: "flightId",
          populate: {
            path: "startFrom destination",
          },
        },
      })
      .limit(perPage)
      .skip(perPage * page)
      .lean();
  },
  searchByFlight: (flightId) => {
    const agg = [
      {
        $lookup: {
          from: "Tickets",
          localField: "tickets",
          foreignField: "_id",
          as: "tickets",
        },
      },
      {
        $unwind: {
          path: "$tickets",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          "tickets.flightId": mongoose.Types.ObjectId(flightId),
        },
      },
      {
        $lookup: {
          from: "Flights",
          localField: "tickets.flightId",
          foreignField: "_id",
          as: "tickets.flightId",
        },
      },
      {
        $unwind: {
          path: "$tickets.flightId",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "Airports",
          localField: "tickets.flightId.startFrom",
          foreignField: "_id",
          as: "tickets.flightId.startFrom",
        },
      },
      {
        $lookup: {
          from: "Airports",
          localField: "tickets.flightId.destination",
          foreignField: "_id",
          as: "tickets.flightId.destination",
        },
      },
      {
        $unwind: {
          path: "$tickets.flightId.startFrom",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: "$tickets.flightId.destination",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$_id",
          pnr: { $first: "$pnr" },
          buyerName: { $first: "$buyerName" },
          buyerId: { $first: "$buyerId" },
          phoneNumber: { $first: "$phoneNumber" },
          email: { $first: "$email" },
          address: { $first: "$address" },
          dateOfBirth: { $first: "$dateOfBirth" },
          nationality: { $first: "$nationality" },
          totalPrice: { $first: "$totalPrice" },
          additional: { $first: "$additional" },
          status: { $first: "$status" },
          tickets: { $push: "$tickets" },
          updatedAt: { $first: "$updatedAt" },
          createdAt: { $first: "$createdAt" },
        },
      },
    ];
    return bookingModel.aggregate(agg);
  },
};
