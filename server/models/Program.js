// taken from module 22 activity 24

const { Schema, model } = require('mongoose');

const programSchema = new Schema({
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
    duration: {
        type: String, // x amount of days, weeks
        // required: true,
    },
    workouts: [
        {
          day: {
              type: String,
              trim: true,
          },
          workout: {
            type: Schema.Types.ObjectId,
            ref: 'Workout',
          },
        },
    ],
    // Other fields specific to the program
});

const Program = model('Program', programSchema);

module.exports = Program;