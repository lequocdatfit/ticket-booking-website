const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const airportSchema = new Schema({
  name: String,
  location: String,
  nation: String
});

const airportModel = mongoose.model('Airports', airportSchema, 'Airports');

module.exports = {
  create: (data) => {
    return airportModel.create(data);
  },
  find: (query) => {
    return airportModel.find(query);
  },
  findById: (_id) => {
    return airportModel.findById(_id);
  },
  update: async (_id, update) => {
    let airport = await airportModel.findOne({ _id: _id });
    Object.assign(airport, update);
    return airport.save();
  },
  delete: (_id) => {
    return airportModel.findByIdAndDelete(_id);
  },
  list: (perPage, page) => {
    return airportModel.find()
      .limit(perPage)
      .skip(perPage * page).lean();
  }
}