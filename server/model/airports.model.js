const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const airportSchema = new Schema({
  name: String,
  location: String,
  nation: String
});

const airportModel = mongoose.model('Airports', airportSchema, 'Airports');

module.exports = {

}