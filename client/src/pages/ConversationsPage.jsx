import { useState, useEffect  } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header/index'
import HomeMenu from '../components/HomeMenu';

export default function ConversationsPage() { 
  const [showMenu, setShowMenu] = useState(false);
  const conversationId = 1
  return (
    <>
      {/* query for existing conversations and list them here with option to create a new conversation */}
      {/* loop through the query result of conversations */}
      <Link to={`/conversation/${conversationId}`}>Conversation 1</Link>
      <Link to={`/conversation/${conversationId}`}>Conversation 2</Link>
      <Link to={`/conversation/${conversationId}`}>Conversation 3</Link>
    </>
  );
}