const jwt = require("jsonwebtoken");

const auth = (res, req, next) => {
  const { authorization } = req.headers;

  const token = authorization.replace("Bearer ", "");

  const { id } = jwt.verify(token, process.env.JWT_SECRET);

  req.userId = id; // añadimos la propiedad userId a la request para el siguiente middleware

  next();
};

module.exports = auth;
