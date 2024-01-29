import { Link } from 'react-router-dom';
import { useUserContext } from "../../utils/UserContext";
import { Icon } from '@iconify/react';

export default function Friends({loading}) {
  const {checkedIn, setCheckedIn, currentWorkout, setCurrentWorkout, user, setUser} = useUserContext()
  
  function MyFriends() {
    const friends = user?.friends
    console.log(user);
  
    return (
      <>
        {friends && friends.map((friend, index) => (
          <Link className='friend-btn' to={`profile/${friend._id}`}>{friend.username}<span>{friend.status.statusName}</span></Link>
        ))}
      </>
    );
  }

  return (
    <>
      <h2 className='ms-3'>Friends</h2> 
      <div className='d-flex flex-column'>
        {loading ? <Icon icon='line-md:loading-loop' width="100" height="100" className='me-1' color="white" /> : <MyFriends/>}         
      </div>
    </>
  );
};