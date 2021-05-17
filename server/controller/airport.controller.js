const airportModel = require('../model/airports.model');

module.exports.createAirport = (req, res) => {
  airportModel.create(req.body).then((result) => {
    res.status(201).json(result);
  }).catch((e) => {
    console.error(e);
    res.status(500).json({ errors: e });
  });
}

module.exports.findById = (req, res) => {
  airportModel.findById(req.params.id).then((result) => {
    res.status(200).json(result);
  }).catch((e) => {
    console.error(e);
    res.status(500).json({ errors: e });
  });
}

module.exports.listAirport = async (req, res) => {
  // let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
  // let page = 0;
  // if (req.query) {
  //   if (req.query.page) {
  //     req.query.page = parseInt(req.query.page);
  //     page = Number.isInteger(req.query.page) ? req.query.page : 0;
  //   }
  // }
  try {
    //let airports = await airportModel.list(limit, page)
    let airports = await airportModel.find({}).lean();
    res.status(200).json(airports);
  } catch (e) {
    console.error(e);
    res.status(500).json();
  }
}

module.exports.patchAirport = (req, res) => {
  airportModel.update(req.params.id, req.body).then((result) => {
    res.status(200).json(result);
  }).catch((e) => {
    console.error(e);
    res.status(500).json({ errors: e });
  });
}

module.exports.deleteAirport = (req, res) => {
  airportModel.delete(req.params.id).then((result) => {
    res.status(200).json(result);
  }).catch((e) => {
    console.error(e);
    res.status(500).json({ errors: e });
  });
}