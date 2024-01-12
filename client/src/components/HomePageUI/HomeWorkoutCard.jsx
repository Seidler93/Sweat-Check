import { useState, useEffect  } from 'react';
import BeginWorkoutModal from '../BeginWorkoutModal';

export default function HomeWorkoutCard({ workout }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className='program-btn' onClick={handleShow}>
        <h3 className='f1'>{workout.name}</h3>
      </button>
      <BeginWorkoutModal show={show} handleClose={handleClose} workout={workout}/>
    </>
  );
};