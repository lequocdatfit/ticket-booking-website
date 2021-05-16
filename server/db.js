const mongoose = require('mongoose');

module.exports = {
  connectMongoDb(mongoUrl) {
    mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
      if (err) {
        console.error(err);
      } else {
        console.log(`Connected to mongo server`);
      }
    })
  }
}