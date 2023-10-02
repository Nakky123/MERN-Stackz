const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema(
  {
    title: String,
    load: Number,
    reps: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Workout", workoutSchema);
