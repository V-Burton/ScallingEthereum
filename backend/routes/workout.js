const express = require("express");
const { 
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,updateWorkout
} = require("../controllers/workoutControllers");

const Workout = require("../models/workoutModels");

const router = express.Router();

//Get all workouts
router.get("/", getWorkouts);

//Get one workout
router.get("/:id", getWorkout);

//POST a new workout
router.post("/", createWorkout);


//Delete a workout
router.delete("/:id", deleteWorkout);


//Update a workout
router.patch("/:id", updateWorkout);

module.exports = router;
