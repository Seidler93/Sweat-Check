// taken from module 22 activity 24
const { Schema, model } = require('mongoose');

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
    type: String,
    trim: true,
  },
  template: {
    type: Boolean,
    default: false,
  },
  workout: [superSetSchema],
});

const Workout = model('Workout', workoutSchema);

module.exports = Workout;
