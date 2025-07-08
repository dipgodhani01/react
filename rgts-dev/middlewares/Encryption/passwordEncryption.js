const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(Number(process.env.GEN_SALT));
const encryptPassword = async (password) => {
  return await bcrypt.hash(password, salt);
};

module.exports = {
  encryptPassword,
};
