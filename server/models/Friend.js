// taken from module 22 activity 24

const { Schema, model } = require('mongoose');

const friendInfoSchema = new Schema({
  username: {
    type: String,
    trim: true,
  },
  friendId:  {
    type: String,
    trim: true,
  }
});

const friendSchema = new Schema({
  userId: {
    type: String,
    required: true,
    trim: true,
  },
  friend: friendInfoSchema,
  state: {
    type: String,
  },
  info: {
    type: Schema.Types.ObjectId,
		ref: 'User',
  }
});

const Friend = model('Friend', friendSchema);

module.exports = Friend;