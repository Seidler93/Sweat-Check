const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const stripe = require('stripe')(/* insert dotenv reference here */);

const resolvers = {
  Query: {
    getUser: async (parent, args, context) => {
      if (context.user) {
        // console.log(context.user);
        // const user = await User.findById(context.user._id); // keep just in case
        return await User.findById(context.user._id).populate('savedJobs');
      }

      throw AuthenticationError;
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
  }
};

module.exports = resolvers;