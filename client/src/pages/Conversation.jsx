import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { GET_CONVERSATION_QUERY } from '../utils/queries';
import { SEND_MESSAGE_MUTATION } from '../utils/mutations';
import { MESSAGE_SENT_SUBSCRIPTION } from '../utils/subscriptions';
import Auth from '../utils/auth'

export default function Conversation() {
  const { conversationId } = useParams();
  const [text, setText] = useState('');
  const [sendMessage] = useMutation(SEND_MESSAGE_MUTATION);
  const { data: conversationData, loading: conversationLoading, refetch: refetchConversation } = useQuery(GET_CONVERSATION_QUERY, {
    variables: { _id: conversationId },
  });


  // Subscribe to new messages
  useSubscription(MESSAGE_SENT_SUBSCRIPTION, {
    variables: { conversationId },
    onData: ({ subscriptionData }) => {
      // Handle new message received through subscription
      // Refetch the conversation data after receiving a new message
      console.log(subscriptionData);
      refetchConversation();
    },
  });

  const handleSendMessage = async () => {
    const senderId = Auth.getProfile().data._id
    try {
      await sendMessage({
        variables: { conversationId, text, senderId },
      });

      // Clear the input field after sending a message
      setText('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    console.log(conversationData);
    // You can perform any additional logic when new messages are fetched
    // For example, scroll to the bottom of the chat window
  }, [conversationData]);

  return (
    <div className='hp'>
      {/* Display the list of messages */}
      {conversationLoading ? (
        <p>Loading messages...</p>
      ) : (
        <ul>
          {conversationData.getConversationById.messages.map((message, index) => (
            <li key={index}>
              <strong>{message.sender.username}:</strong> {message.text}
            </li>
          ))}
        </ul>
      )}

      {/* Message input and send button */}
      <div>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}
