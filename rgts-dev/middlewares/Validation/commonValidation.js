const { validationResult } = require("express-validator");

const validation = (request, response, next) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
     let responseData = { status: 400, success: false, error: errors.array() };
      response.status(responseData.status).json(responseData);
    } else {
      next();
    }
  } catch (err) {
  //  let responseData = { status: 500, success: false, error: err.message };
    response
      .status(500)
      .json({ status: 500, success: false, error: err.message });
  }
};

module.exports = {
  validation,
};
