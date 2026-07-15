const mongoose = require("mongoose");

const validateId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(404).json({ message: "Movie not found" });
    return;
  }
  next();
};

module.exports = validateId;
