import ShareModal from './ShareModal';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { QUERY_FRIENDS_BY_ID } from '../utils/queries';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';

export default function ShareWorkoutBtn() {
  const [show, setShow] = useState(false)

  const { loading: loadingFirst, data: dataFirst } = useQuery(QUERY_FRIENDS_BY_ID, {
    variables: { userId: Auth.getProfile().data._id },
  });

  function shareWorkout() {

  }

  return (
    <>
      <button onClick={() => setShow(true)}>Share</button>
      <Modal show={show} onHide={() => setShow(false)} className='bg-dark'>
        <Modal.Header closeButton>
          <Modal.Title>Select Workout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loadingFirst ? (
            <p>Loading friends...</p>
          ) : dataFirst.getFriendsByUserId.friends ? (
            <ul>
              {dataFirst.getFriendsByUserId.friends?.map((friend) => (
                <li key={friend.friend._id}>
                  {friend.friend.username}
                  <button onClick={() => shareWorkout(friend._id)}>Share Workout</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No friends found.</p>
            )}
        </Modal.Body>
      </Modal>
    </>
  )
}