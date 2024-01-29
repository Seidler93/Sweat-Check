import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from "../utils/UserContext";
import { useQuery } from '@apollo/client';
import { GET_MY_CONVERSATIONS_QUERY } from '../utils/queries';
import Auth from '../utils/auth';

export default function ConversationsPage() { 
  const _id = Auth.getProfile().data._id
  console.log(_id);
  const { data: conversationsData, loading: conversationsLoading } = useQuery(GET_MY_CONVERSATIONS_QUERY, {
    variables: { _id },
  });  

  useEffect(() => {
    console.log(conversationsData);
    // You can perform any additional logic when new messages are fetched
    // For example, scroll to the bottom of the chat window
  }, [conversationsData])

  return (
    <div className='hp d-flex flex-column'>
      {/* query for existing conversations and list them here with option to create a new conversation */}
      {/* loop through the query result of conversations */}
      {conversationsData && !conversationsLoading && conversationsData.getMyConversations.conversations.length > 0 && (
        conversationsData.getMyConversations.conversations.map((conversation, index) => (
          <Link key={index} className='mt-3 btn btn-primary' to={`/conversation/${conversation._id}`}>
            {conversation._id}
          </Link>
        ))
      )}
    </div>
  );
}
