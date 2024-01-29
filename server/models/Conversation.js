const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
  text: {
    type: String,
  },
  sender: {
    type: Schema.Types.ObjectId,
		ref: 'User',
  }
});

const ConversationSchema = new Schema({
  messages: [messageSchema]
});

const Conversation = model('Conversation', ConversationSchema);

module.exports = Conversation;
