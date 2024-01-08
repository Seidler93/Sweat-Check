// taken from module 22 activity 24

const mongoose = require('mongoose');
const validator = require('validator');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const exerciseSchema = new Schema({
  name: {
    type: String,
    // required: true,
    trim: true,
  },
  type: {
    type: String,
    // required: true,
    trim: true,
  },
  muscle: {
    type: String,
    // required: true,
    trim: true,
  },
  equipment: {
    type: String,
    // required: true,
    trim: true,
  },
  difficulty: {
    type: String,
    // required: true,
    trim: true,
  },
  instructions: {
    type: String,
    trim: true,
  },
});

const setSchema = new Schema({
  reps: {
    type: Number,
    // required: true,
  },
  weight: {
    type: Number,
    // required: true,
  },
  completed: {
    type: Boolean,
    default: false,
    // required: true,
  },
});

const exerciseSetSchema = new Schema({
  exerciseName: {
    type: String,
    // required: true,
    trim: true,
  },
  sets: [setSchema],
});

const superSetSchema = new Schema({
  exercises: [exerciseSetSchema],
});

const workoutSchema = new Schema({
  originalId: {
    type: String,
    trim: true,
  },
  userId: {
    type: String,
    trim: true,
  },
  name: {
    type: String,
    // required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  dateCompleted: {
    type: Date,
    default: Date.now,
  },
  workout: [superSetSchema],
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
