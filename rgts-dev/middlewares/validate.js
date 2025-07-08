const {SUCCESS,CLIENT_ERROR,UNAUTHORIZED_USER } = require("../config/responseCodes")
const validation = (schema) => async (req, res, next) => {
    const body = req.body;
    try {
      await schema.validate(body);
      return next();
    } catch (err) {    
       return res.status(400).json({status:false,message:err.message,data:{}})
    }
  };

module.exports = validation;