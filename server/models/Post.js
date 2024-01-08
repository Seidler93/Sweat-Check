// taken from module 22 activity 24

const mongoose = require('mongoose');
const validator = require('validator');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const commentSchema = new Schema({
  postId: {
    type: String,
  },
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

const Post = mongoose.model('Post', postSchema);

module.exports = Post;