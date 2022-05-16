const jwt = require("jsonwebtoken");
const User = require("../../database/models/User");

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username, password }); // findOne devuelve solo un objecto

  if (!user) {
    res.status(404).json({ msg: "user not find" });
    return; // si llega aqui interrumpe el flijo y no intenta enviar la response de la linea de abajo
  }
  // npm i jsonwebtoken
  // el secrteo en .env con JWT_SECRET
  res.status(200).json();

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });

  res.json({ token });
};

module.exports = loginUser;
