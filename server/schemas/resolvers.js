const { User, Workout, Friend } = require('../models');
const Conversation = require('../models/Conversation')
const { signToken, AuthenticationError } = require('../utils/auth');
const { PubSub } = require('@apollo/server');
// const stripe = require('stripe')(/* insert dotenv reference here */);

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('friends');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
    homePage: async (parent, { _id }) => {
      try {
        const user = await User.findOne({ _id }).populate({
          path: 'workouts',
          match: { template: true }, // Find workouts where only where template is true
          options: { limit: 10 }, // Limit the number of populated workouts
        })
        .populate('friends');
    
      // Ensure the user exists
      if (!user) {
        // Handle the case where the user is not found
        throw new Error('User not found');
      }
      
      return user;
    } catch (error) {
        console.error('Error fetching user:', error.message);
        throw new Error('Failed to fetch user');
      }
    
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
    getFriendsByUserId: async (_, { userId }) => {
      try {
        const friends = await Friend.find({ userId: userId });

        if (!friends) {
          throw new Error('Workout not found');
        }

        return friends;
      } catch (error) {
        console.error(error)
        console.error('Error fetching workout:', error.message);
        throw new Error('Failed to fetch workout');
      }
    },
    getConversations: async () => {
      try {
        const storedConversations = await Conversation.find().populate({
          path: 'messages',
          populate: {
            path: 'sender',
            model: 'User',
          },
        });
        return storedConversations;
      } catch (error) {
        console.error('Error fetching conversations:', error.message);
        throw new Error('Failed to fetch conversations');
      }
    },
    getConversationById: async (_, { id }) => {
      try {
        const conversation = await Conversation.findOne({ id }).populate({
          path: 'messages',
          populate: {
            path: 'sender',
            model: 'User',
          },
        });
        if (!conversation) {
          throw new Error('Conversation not found');
        }
        return conversation;
      } catch (error) {
        console.error(error)
        console.error('Error fetching conversation:', error.message);
        throw new Error('Failed to fetch conversation');
      }
    },
    getMyConversations: async (_, { id }) => {
        try {
        const user = await User.findOne({ id })
        // .populate({
          //   path: 'conversations',
          //   populate: {
            //     path: 'messages',
            //     populate: {
              //       path: 'sender',
              //       model: 'User',
              //     },
              //   },
              // })
              .populate('conversations')     
              console.log(user);
        
        if (!user) {
          throw new Error('User not found');
        }

        return user;
      } catch (error) {
        console.error(error)
        console.error('Error fetching conversation:', error.message);
        throw new Error('Failed to fetch conversation');
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

        if (workoutInput.userId) {
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
    friendRequest: async (parent, { friendRequest }, context) => {
      try {
        const friend = await User.findOne({username: friendRequest.friend.username});

        if (friendRequest.userId) {
          await User.findOneAndUpdate(
            { _id: friendRequest.userId },
            { $addToSet: { friends: friend } }
          );
        }

        return friend
      } catch (error) {
        console.error('Error creating friend:', error);
        throw new Error('Failed to create friend');
      }
    },
    setStatus: async (parent, { userId, statusName, checkInTime }, context) => {
      try {
        const user = await User.findOneAndUpdate(
          { _id: userId },
          {
            $set: {
              'status.statusName': statusName,
              'status.checkInTime': checkInTime,
            },
          },
          { new: true } // To return the updated user document
        );
    
        return user;
      } catch (error) {
        console.error('Error changing status:', error);
        throw new Error('Failed to change status');
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
      try {
      const workout = await Workout.findOneAndDelete({
        _id: workoutId,
        userId: userId,
      });

      await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { workouts: workoutId} }
      ); 

      return workout;

      } catch (error) {
        console.error('Error updating workout:', error.message);
        throw new Error('Failed to update workout');
      }
    },
    createConversation: async (parent, { receiverId, senderId },) => {
      try {
        const createdConversation = await Conversation.create({receiverId, senderId});

        if (createdConversation) {
          await User.findOneAndUpdate(
            { _id: senderId },
            { $addToSet: { conversations: createdConversation } }
          );
          await User.findOneAndUpdate(
            { _id: receiverId },
            { $addToSet: { conversations: createdConversation } }
          );
          console.log('created');
        }

        return createdConversation
      } catch (error) {
        console.error('Error creating workout:', error.message);
        throw new Error('Failed to create workout');
      }
    },
    sendMessage: async (_, { conversationId, text, senderId }, context) => {
      try {
        const user = await User.findOne({_id: senderId});
        
        const newMessage = {text: text, sender: user}

        // Find or create a conversation based on senderId and receiverId
        let conversation = await Conversation.findOne({ _id: conversationId });
        conversation.messages.push(newMessage);

        // Save the updated conversation
        await conversation.save();

        // Publish the update to subscribers
        pubsub.publish(`MESSAGE_SENT_${conversationId}`, {
          messageSent: newMessage,
        });

        return newMessage;
      } catch (error) {
        console.log(error);
        console.log(error);
        console.error('Error sending message:', error.message);
        throw new Error('Failed to send message');
      }
    },
  }, 

  Subscription: {
    messageSent: {
      subscribe: (_, { conversationId }) => {
        // Subscribe to the channel specific to the receiverId
        return pubsub.asyncIterator(`MESSAGE_SENT_${conversationId}`);
      },
    },
  },
}

module.exports = resolvers;