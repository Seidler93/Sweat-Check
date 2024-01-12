import { useState, useEffect  } from 'react';
import BeginWorkoutModal from './BeginWorkoutModal';

export default function MyWorkoutsCard({workout}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function formatDate(dateString) {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
    return formattedDate;
  }

  return (
    <>
      <button className='my-workout-card' onClick={handleShow}>
        <h3 className='f1'>{workout.name}</h3>
        <h3 className='f1'>{formatDate(workout.dateCompleted)}</h3>
      </button>
      <BeginWorkoutModal show={show} handleClose={handleClose} workout={workout}/>
    </>
  )
}