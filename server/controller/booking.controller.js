const bookingModel = require('../model/bookings.model');
const ticketModel = require('../model/tickets.model');

module.exports.addBooking = (req, res) => {
  bookingModel.create(req.body).then((result) => {
    res.status(201).json(result);
  }).catch((e) => {
    console.error(e);
    res.status(500).json({ errors: e });
  });
}

module.exports.findById = (req, res) => {
  bookingModel.findById(req.params.id).then((result) => {
    res.status(200).json(result);
  }).catch((e) => {
    console.error(e);
    res.status(500).json({ errors: e });
  });
}

module.exports.findByPNR = (req, res) => {
  bookingModel.find(req.params.pnr).then((result) => {
    res.status(200).json(result);
  }).catch((e) => {
    console.error(e);
    res.status(500).json({ errors: e });
  });
}

module.exports.patchBooking = (req, res) => {
  bookingModel.update(req.params.id, req.body).then((result) => {
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
  bookingModel.list(limit, page).then((result) => {
    res.status(200).json(result);
  }).catch((e) => {
    console.error(e);
    res.status(500).json({ errors: e });
  });
}

module.exports.deleteBooking = (req, res) => {
  bookingModel.delete(req.params.id).then((result) => {
    res.status(200).json(result);
  }).catch((e) => {
    console.error(e);
    res.status(500).json({ errors: e });
  });
}

module.exports.createBookingAndTickets = async (req, res) => {
  let ticketInfos;
  if (req.body.hasOwnProperty('ticketInfos')) {
    ticketInfos = JSON.parse(req.body.ticketInfos);
  } else if (!Array.isArray(ticketInfos)) {
    return res.status(400).json({ errors: ['Does not found any tickets'] });
  }
  let ticketObjects = [];
  try {
    let ticketPromises = ticketInfos.map(element => {
      return ticketModel.create(element._id);
    });
    ticketObjects = await Promise.all(ticketPromises);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ errors: e });
  }
  req.body.tickets = [];
  req.body.totalPrice = 0;
  ticketObjects.forEach(element => {
    req.body.tickets.push(element._id);
    req.body.totalPrice += element.price;
  });
  bookingModel.create(req.body).then((result) => {
    res.status(201).json(result);
  }).catch((e) => {
    console.error(e);
    res.status(500).json({ errors: e });
  });
}