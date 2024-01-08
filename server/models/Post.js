// taken from module 22 activity 24

const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
  commentText: {
      type: String,
  },
  commentAuthor: {
      type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

const postSchema = new Schema({
  username: {
      type: String,
  },
  userId: {
      type: String,
  },
  workoutId: {
      type: String,
  },
  workoutName: {
      type: String,
  },
  mediaUrl: {
      type: String,
  },
  postText: {
      type: String,
  },
  createdAt: {
      type: Date,
      default: Date.now
  },
  visibility: {
      type: Boolean,
      default: true, // true = public false = private
  },
  comments: [ commentSchema ],
});

const Post = model('Post', postSchema);

module.exports = Post;