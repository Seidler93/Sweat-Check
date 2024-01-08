// taken from module 22 activity 24

const { Schema, model } = require('mongoose');

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

const Friend = model('Friend', friendSchema);

module.exports = Friend;