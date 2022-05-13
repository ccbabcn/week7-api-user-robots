const { Schema, model } = require("mongoose");

const RobotSchema = new Schema({
  name: { type: String },
  velocity: { type: Number },
  resistance: { type: Number },
  created: { type: String },
  image: { type: String },
});

const Robot = model("Robot", RobotSchema, "robots");

module.exports = Robot;
