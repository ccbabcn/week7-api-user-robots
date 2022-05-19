const bcrypt = require("bcrypt");

const encryptPassWord = (password) => bcrypt.hash(password, 10);

module.exports = encryptPassWord;
