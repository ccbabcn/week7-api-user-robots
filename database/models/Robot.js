const { Schema, model } = require("mongoose");

const RobotSchema = new Schema({
  name: { type: String, required: true }, // si  nohay mas cosas además del tipe, {} no hace falta
  velocity: { type: Number },
  resistance: { type: Number },
  created: { type: String },
  image: { type: String, unique: true }, // campo que debe ser unico dentro de la base de datos

  owner: {
    type: Schema.Types.ObjectId,
    ref: "User", // nombre interno del modelo user definido en el schema de user
    required: true, // si es necesario que todos los robots tengan un dueño
  },
});

const Robot = model("Robot", RobotSchema, "robots");

module.exports = Robot;
