import { gql } from '@apollo/client';
import Conversation from '../pages/Conversation';

export const MESSAGE_SENT_SUBSCRIPTION = gql`
  subscription MessageSent($conversationId: ID!) {
    messageSent(conversationId: $conversationId) {
      text
      sender {
        _id
        username
      }
    }
  }
`;

// function LatestMessage({ conversationId }) {
//   const { data, loading } = useSubscription(
//     MESSAGE_SENT_SUBSCRIPTION,
//     { variables: { conversationId } }
//   );
//   return <h4>New Message: {!loading && data.messageSent.text}</h4>;
// }

// function ConversationWithData({ params }) {
//   const { subscribeToMore, ...result } = useQuery(
//     COMMENTS_QUERY,
//     { variables: { conversationId: params.conversationId } }
//   );

//   return (
//     <Conversation
//       {...result}
//       subscribeToNewMessages={() =>
//         subscribeToMore({
//           document: MESSAGE_SENT_SUBSCRIPTION,
//           variables: { conversationId: params.conversationId  },
//           updateQuery: (prev, { subscriptionData }) => {
//             if (!subscriptionData.data) return prev;
//             const newFeedItem = subscriptionData.data.messageSent;

//             return Object.assign({}, prev, {
//               conversation: {
//                 messages: [newFeedItem, ...prev.conversation.messages]
//               }
//             });
//           }
//         })
//       }
//     />
//   );
// }

// export function Conversation({subscribeToNewMessages}) {
//   useEffect(() => subscribeToNewMessages(), []);
//   return <>...</>
// }