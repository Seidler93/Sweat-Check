const { User, Workout } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
// const stripe = require('stripe')(/* insert dotenv reference here */);

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
    getAllWorkouts: async () => {
      try {
        const workouts = await Workout.find();
        return workouts;
      } catch (error) {
        console.error('Error fetching workouts:', error.message);
        throw new Error('Failed to fetch workouts');
      }
    },
    getWorkoutsByUserId: async (_, { userId }) => {
      try {
        const workout = await Workout.find({ userId: userId });

        if (!workout) {
          throw new Error('Workout not found');
        }
        return workout;
      } catch (error) {
        console.error(error)
        console.error('Error fetching workout:', error.message);
        throw new Error('Failed to fetch workout');
      }
    },
  },

  Mutation: {
    addUser: async (parent, { input }) => {
      const user = await User.create(input);
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      console.log('clicked');
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      console.log({ token, user });

      return { token, user };
    },
    createWorkout: async (parent, { workoutInput }, context) => {
      try {
        const createdWorkout = await Workout.create(workoutInput);

        if (workoutInput.userId != "") {
          await User.findOneAndUpdate(
            { _id: workoutInput.userId },
            { $addToSet: { workouts: createdWorkout } }
          );
        }

        return createdWorkout
      } catch (error) {
        console.error('Error creating workout:', error.message);
        throw new Error('Failed to create workout');
      }
    },
    updateWorkout: async (parent, { workoutId, updatedWorkout }) => {
      try {
        // Assuming you're using Mongoose for MongoDB
        const workout = await Workout.findByIdAndUpdate(
          workoutId,
          updatedWorkout,
          { new: true }
        );

        if (!workout) {
          throw new Error('Workout not found');
        }

        return workout;
      } catch (error) {
        // Handle the error as needed, log it, etc.
        console.error('Error updating workout:', error.message);
        throw new Error('Failed to update workout');
      }
    },
    deleteWorkout: async (parent, { workoutId, userId }) => {
      const workout = await Workout.findOneAndDelete({
        _id: workoutId,
        userId: userId,
      });

      await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { workouts: workoutId} }
      );

      return workout;
    },
  //   removeThought: async (parent, { thoughtId }, context) => {
  //     if (context.user) {
  //       const thought = await Thought.findOneAndDelete({
  //         _id: thoughtId,
  //         thoughtAuthor: context.user.username,
  //       });

  //       await User.findOneAndUpdate(
  //         { _id: context.user._id },
  //         { $pull: { thoughts: thought._id } }
  //       );

  //       return thought;
  //     }
  //     throw AuthenticationError;
  //   },
  //   addComment: async (parent, { thoughtId, commentText }, context) => {
  //     if (context.user) {
  //       return Thought.findOneAndUpdate(
  //         { _id: thoughtId },
  //         {
  //           $addToSet: {
  //             comments: { commentText, commentAuthor: context.user.username },
  //           },
  //         },
  //         {
  //           new: true,
  //           runValidators: true,
  //         }
  //       );
  //     }
  //     throw AuthenticationError;
  //   },
  //   removeComment: async (parent, { thoughtId, commentId }, context) => {
  //     if (context.user) {
  //       return Thought.findOneAndUpdate(
  //         { _id: thoughtId },
  //         {
  //           $pull: {
  //             comments: {
  //               _id: commentId,
  //               commentAuthor: context.user.username,
  //             },
  //           },
  //         },
  //         { new: true }
  //       );
  //     }
  //     throw AuthenticationError;
  //   },
  },
};

module.exports = resolvers;