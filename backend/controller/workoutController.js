const Workout = require("../models/workout");

// get all workouts
const getAllWorkout = async (req, res) => {
  const allWorkouts = await Workout.find({}).sort({ createdAt: -1 });
  res.status(200).json(allWorkouts);
};

// get a single workout
const getSingleWorkouts = async (req, res) => {
  const workoutID = req.params.id;
  try {
    const singleWorkout = await Workout.findById(workoutID);
    if (!singleWorkout) {
      res.status(404).json({ error: "The workout doesn't exist" });
    }
    res.status(200).json(singleWorkout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// create a new workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;
  try {
    const create = await Workout.create({ title, load, reps });
    res.status(200).json(create);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a workout
const deleteWorkout = async (req, res) => {
  const workoutID = req.params.id;
  const { title, load, reps } = req.body;
  try {
    const deleteZ = await Workout.findByIdAndDelete(workoutID);
    if (!deleteZ) {
      res.status(404).json({ message: "message not found" });
    }
    res.status(200).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update a workout
const updateWorkout = async (req, res) => {
  const workoutID = req.params.id;
  const { title, load, reps } = req.body;
  try {
    const updateZ = await Workout.findByIdAndUpdate(workoutID, {
      title,
      load,
      reps,
    });
    if (!updateZ) {
      res.status(404).json({ message: "workout not found" });
    }
    res.status(200).json(updateZ);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createWorkout,
  updateWorkout,
  deleteWorkout,
  getSingleWorkouts,
  getAllWorkout,
};
