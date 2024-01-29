// taken from module 22 activity 24

const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const statusSchema = new Schema({
  statusName: {
    type: String,
    default: 'not at gym',
  },
  checkInTime: {
    type: Date,
    default: Date.now
  },
});

const userSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  username: {
    type: String,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: {
    type: String,
    minlength: 5,
  },
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  status: statusSchema, 
  workouts: [{
    type: Schema.Types.ObjectId,
    ref: 'Workout',
	}],
  programs: [{
		type: Schema.Types.ObjectId,
		ref: 'Program',
	}],
  posts: [{
		type: Schema.Types.ObjectId,
		ref: 'Post',
  }],
  conversations: [{
    type: Schema.Types.ObjectId,
		ref: 'Conversation',
  }]
});

// set up pre-save middleware to create password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;