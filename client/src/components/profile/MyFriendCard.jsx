import { Link } from 'react-router-dom';

export default function MyFriendCard({ friend }) {
  //console.log('Friend prop:', friend);

  return (
    <Link to={`/profile/${friend.id}`} className='my-friend-card'>
      <p className='friend-username text-dark'>{friend.username}</p>
      <p className='friend-status text-dark'>{friend.status}</p>
    </Link>
  );
}