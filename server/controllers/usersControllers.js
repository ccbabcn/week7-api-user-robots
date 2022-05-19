const { bcrypt } = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../database/models/User");

/// encriptar contraseña hasheada si hace falta desde utils encrypt

const loginUser = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }); // findOne devuelve solo un objecto, no ponemos  password para evitar desencriptar si user no exite

  if (!user) {
    const error = new Error("Username or password are worng"); // siempre tiene que ser ambiguo por seguridad
    error.code = 403;
    next(error);
    // res.status(404).json({ msg: "user not find" });
    // return; // si llega aqui interrumpe el flijo y no intenta enviar la response de la linea de abajo
  } else {
    // instalar bcrypt ofrece metodo para encrptar contraseñas
    const rightPassword = await bcrypt.compare(password, user.password); // user viene de body, password es la contraseña hasheada

    const userData = {
      name: user.name,
      username: user.username,
      id: user.id,
    };

    if (!rightPassword) {
      const error = new Error("Username or password are worng");
      error.code = 403;
      next(error);
    }
    // npm i jsonwebtoken
    // el secrteo en .env con JWT_SECRET
    else {
      const token = jwt.sign(userData, process.env.JWT_SECRET); // {expiresIn: "2d",}
      res.status(201).json({ token });
    }
  }
};

const userRegister = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username }); // objeto literal, devuelve un documento (entidad dentro de la coleccion) que es un objecto, si no encuentra devuelve null
    if (user) {
      // if asigna boolean trufy o falsy si no es boolean
      const error = new Error();
      error.customMessage = "user or password already exist";
      error.statusCode = 409;

      next(error);
    }

    const encryptedPass = bcrypt.has(password, 10);

    const newUser = await User.create({ username, password: encryptedPass });

    res
      .status(201)
      .json({ user: { username: newUser.username, id: newUser.id } });
  } catch (error) {
    error.customMessage = "worng user data";
    error.statusCode = 400;

    next(error);
  }
};

module.exports = { loginUser, userRegister };
