import { Link } from 'react-router-dom';

export default function MyFriendCard({ friend }) {
  console.log('Friend prop:', friend);

  return (
    <Link to={`/profile/${friend._id}`} className='my-friend-card'>
      <p className='friend-username'>{friend.username}</p>
      <p className='friend-status'>{friend.status}</p>
    </Link>
  );
}