import { useState, useEffect  } from 'react';
import { Link } from 'react-router-dom';

export default function MessagesPage() {
  const [showMenu, setShowMenu] = useState(false);
 
  return (
    <>
      <Link to={'/conversations'}>Conversation 1</Link>
    </>
  );
}