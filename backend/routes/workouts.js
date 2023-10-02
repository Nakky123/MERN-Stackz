const express = require("express");
const {
  createWorkout,
  updateWorkout,
  deleteWorkout,
  getSingleWorkouts,
  getAllWorkout,
} = require("../controller/workoutController");

const router = express.Router();

// Get all workouts
router.get("/", getAllWorkout);

// Get a single workouts
router.get("/:id", getSingleWorkouts);

// POST A NEW WORKOUTS
router.post("/", createWorkout);

// Delete a workout
router.delete("/:id", deleteWorkout);

// Update a workout
router.patch("/:id", updateWorkout);

module.exports = router;
