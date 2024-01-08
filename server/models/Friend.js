// taken from module 22 activity 24

const mongoose = require('mongoose');
const validator = require('validator');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const friendSchema = new Schema({
  user: {
    type: String,
    required: true,
    trim: true,
  },
  friend: {
    type: Schema.Types.ObjectId,
    ref: 'Friend',
  },
});

const Friend = mongoose.model('Friend', friendSchema);

module.exports = Friend;