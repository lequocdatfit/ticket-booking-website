const ticketModel = require('../model/tickets.model');
const flightModel = require('../model/flights.model');

module.exports.createTicket = async (req, res) => {
  try {
    if (req.body.hasOwnProperty('additional')) {
      req.body.additional = JSON.parse(req.body.additional);
    }
    if (req.body.hasOwnProperty('flightId')) {
      let flight = await flightModel.findById(req.body.flightId);
      if (!flight) {
        throw new Error('Not exist flight');
      }
    }
  } catch (e) {
    return res.status(400).json({ errors: e });
  }
  ticketModel.create(req.body).then((result) => {
    res.status(201).json(result);
  }).catch((e) => {
    console.error(e);
    res.status(500).json({ errors: e });
  });
}

module.exports.findById = (req, res) => {
  ticketModel.findById(req.params.id).then((result) => {
    res.status(200).json(result);
  }).catch((e) => {
    console.error(e);
    res.status(500).json({ errors: e });
  });
}

module.exports.patchTicket = (req, res) => {
  try {
    if (req.body.hasOwnProperty('additional')) {
      req.body.additional = JSON.parse(req.body.additional);
    }
    if (req.body.hasOwnProperty('flightId')) {
      let flight = await flightModel.findById(req.body.flightId);
      if (!flight) {
        throw new Error('Not exist flight');
      }
    }
  } catch (e) {
    return res.status(400).json({ errors: e });
  }
  ticketModel.update(req.params.id, req.body).then((result) => {
    res.status(200).json(result);
  }).catch((e) => {
    console.error(e);
    res.status(500).json({ errors: e });
  });
}

module.exports.deleteTicket = (req, res) => {
  ticketModel.delete(req.params.id).then((result) => {
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
  ticketModel.list(limit, page).then((result) => {
    res.status(200).json(result);
  }).catch((e) => {
    console.error(e);
    res.status(500).json({ errors: e });
  });
}