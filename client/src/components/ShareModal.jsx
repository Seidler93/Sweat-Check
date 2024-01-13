import Modal from 'react-bootstrap/Modal';
import { QUERY_FRIENDS_BY_ID } from '../utils/queries';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { useEffect } from 'react';

export default function ShareModal({show, setShow}) {
  const { loading: loadingFirst, data: dataFirst } = useQuery(QUERY_FRIENDS_BY_ID, {
    variables: { userId: Auth.getProfile().data._id },
  });

  function shareWorkout() {

  }

  useEffect(() => {
    // Log the dataFirst variable
    console.log('Data First:', dataFirst);
  }, [dataFirst, ])

  return (  
    <>
      <Modal show={show} onHide={setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Select Workout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loadingFirst ? (
            <p>Loading friends...</p>
          ) : dataFirst.getFriendsByUserId.friends?.length === 0 ? (
            <p>No friends found.</p>
          ) : (
            <ul>
              {dataFirst.getFriendsByUserId.friends?.map((friend) => (
                <li key={friend.id}>
                  {friend.name}
                  <button onClick={() => shareWorkout(friend.id)}>Share Workout</button>
                </li>
              ))}
            </ul>
          )}
        </Modal.Body>
      </Modal>
    </>
  )
}