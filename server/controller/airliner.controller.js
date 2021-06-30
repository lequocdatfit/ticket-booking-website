const airlinerModel = require('../model/airliners.model');

module.exports.createAirliner = (req, res) => {
  try {
    /* if (req.body.hasOwnProperty('passengerCapacity')) {
      req.body.passengerCapacity = JSON.parse(req.body.passengerCapacity);
    }
    if (req.body.hasOwnProperty('seatPitch')) {
      req.body.seatPitch = JSON.parse(req.body.seatPitch);
    }
    if (req.body.hasOwnProperty('additional')) {
      req.body.additional = JSON.parse(req.body.additional);
    }*/
  }
  catch (e) {
    console.error(e);
    return res.status(400).json({ errors: e });
  }
  airlinerModel.create(req.body).then((result) => {
    res.status(201).json(result);
  }).catch((e) => {
    console.error(e);
    res.status(500).json({ errors: e });
  });
}

module.exports.list = async (req, res) => {
  try {
    let airliners = await airlinerModel.find({}).lean();
    res.status(200).json(airliners);
  } catch (e) {
    console.error(e);
    res.status(500).json();
  }
}

module.exports.findById = (req, res) => {
  airlinerModel.findById(req.params.id).then((result) => {
    res.status(200).json(result);
  }).catch((e) => {
    console.error(e);
    res.status(500).json({ errors: e });
  });
}

module.exports.patchAirliner = (req, res) => {
  try {
    /* if (req.body.hasOwnProperty('passengerCapacity')) {
      req.body.passengerCapacity = JSON.parse(req.body.passengerCapacity);
    }
    if (req.body.hasOwnProperty('seatPitch')) {
      req.body.seatPitch = JSON.parse(req.body.seatPitch);
    }
    if (req.body.hasOwnProperty('additional')) {
      req.body.additional = JSON.parse(req.body.additional);
    } */
  }
  catch (e) {
    console.error(e);
    return res.status(400).json({ errors: e });
  }
  airlinerModel.update(req.params.id, req.body).then((result) => {
    res.status(200).json(result);
  }).catch((e) => {
    console.error(e);
    res.status(500).json({ errors: e });
  });
}

module.exports.deleteAirliner = (req, res) => {
  airlinerModel.delete(req.params.id).then((result) => {
    res.status(200).json(result);
  }).catch((e) => {
    console.error(e);
    res.status(500).json({ errors: e });
  });
}