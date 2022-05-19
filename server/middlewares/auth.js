const jwt = require("jsonwebtoken");

const auth = (res, req, next) => {
  const { authorization } = req.headers; // a la api le ha de llegar este header con un Beare ....

  try {
    if (!authorization.includes("Bearer ")) {
      throw new Error();
    }
    const token = authorization.replace("Bearer ", "");

    const { id } = jwt.verify(token, process.env.JWT_SECRET); // en esta libreria si el token es incorrecto genera un error

    req.userId = id; // añadimos la propiedad userId a la request para el siguiente middleware

    next();
  } catch {
    const customError = new Error("Invalid token");
    customError.statusCode = 401; // le llegado esta propiedad al general error
    next(customError);
  }
};

module.exports = auth;
