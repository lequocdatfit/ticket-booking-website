const flightModel = require('../model/flights.model');
const airlinerModel = require('../model/airliners.model');
const airportModel = require('../model/airports.model');

module.exports.createFlight = async (req, res) => {
  try {
    if (req.body.hasOwnProperty('seat')) {
      req.body.seat = JSON.parse(req.body.seat);
    }
    if (req.body.hasOwnProperty('additional')) {
      req.body.additional = JSON.parse(req.body.additional);
    }
    if (req.body.hasOwnProperty('airliner')) {
      let airliner = await airlinerModel.findById(req.body.airliner);
      if (!airliner)
        throw new Error('Not exist airliner');
    }
    if (req.body.hasOwnProperty('startFrom')) {
      let airport = await airportModel.findById(req.body.startFrom);
      if (!airport)
        throw new Error('Not exist airport');
    }
    if (req.body.hasOwnProperty('destination')) {
      let airport = await airportModel.findById(req.body.destination);
      if (!airport)
        throw new Error('Not exist airport');
    }
  } catch (e) {
    console.error(e);
    return res.status(400).json({ errors: e });
  }
  flightModel.create(req.body).then((result) => {
    res.status(201).json(result);
  }).catch((e) => {
    console.error(e);
    res.status(500).json({ errors: e });
  });
}

module.exports.findById = (req, res) => {
  flightModel.findById(req.params.id).then((result) => {
    res.status(200).json(result);
  }).catch((e) => {
    console.error(e);
    res.status(500).json({ errors: e });
  });
}

module.exports.list = (req, res) => {
  let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
  let page = 0;
  if (req.query) {
    if (req.query.page) {
      req.query.page = parseInt(req.query.page);
      page = Number.isInteger(req.query.page) ? req.query.page : 0;
    }
  }
  flightModel.list(limit, page).then((result) => {
    res.status(200).json(result);
  }).catch((e) => {
    console.error(e);
    res.status(500).json({ errors: e });
  });
}

module.exports.patchFlight = (req, res) => {
  try {
    if (req.body.hasOwnProperty('seat')) {
      req.body.seat = JSON.parse(req.body.seat);
    }
    if (req.body.hasOwnProperty('additional')) {
      req.body.additional = JSON.parse(req.body.additional);
    }
    if (req.body.hasOwnProperty('airliner')) {
      let airliner = await airlinerModel.findById(req.body.airliner);
      if (!airliner)
        throw new Error('Not exist airliner');
    }
    if (req.body.hasOwnProperty('startFrom')) {
      let airport = await airportModel.findById(req.body.startFrom);
      if (!airport)
        throw new Error('Not exist airport');
    }
    if (req.body.hasOwnProperty('destination')) {
      let airport = await airportModel.findById(req.body.destination);
      if (!airport)
        throw new Error('Not exist airport');
    }
  } catch (e) {
    console.error(e);
    return res.status(400).json({ errors: e });
  }
  flightModel.update(req.params.id, req.body).then((result) => {
    res.status(200).json(result);
  }).catch((e) => {
    console.error(e);
    res.status(500).json({ errors: e });
  });
}

module.exports.deleteFlight = (req, res) => {
  flightModel.delete(req.params.id).then((result) => {
    res.status(200).json(result);
  }).catch((e) => {
    console.error(e);
    res.status(500).json({ errors: e });
  });
}

module.exports.listFlightInDate = (req, res) => {
  if (!req.query.date || !req.query.start || !req.query.destination) {
    return res.status(400).json({ errors: 'Not enough arguments' });
  }
  let listAll = req.query.listall ? (req.query.listall.toLowerCase() === 'true') : false;
  var date = new Date(req.query.date);
  let queryAggregate = [
    {
      $match: {
        startFrom: req.query.start,
        destination: req.query.destination,
      }
    },
    {
      $lookup: {
        from: 'Tickets',
        localField: '_id',
        foreignField: 'flightId',
        as: 'tickets'
      }
    },
    {
      $match: {
        $or: [{
          tickets: {
            status: true
          }
        }]
      }
    }
  ];
}