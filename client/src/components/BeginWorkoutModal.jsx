import Modal from 'react-bootstrap/Modal';
import HomeExerciseCard from './HomePageUI/HomeExerciseCard';
import BeginWorkoutBtn from './BeginWorkoutBtn';
import CancelWorkoutBtn from './CancelWorkoutBtn';
import ShareWorkoutBtn from './ShareWorkoutBtn';
import { useState } from 'react';

export default function BeginWorkoutModal({handleClose, workout, show}) {
  const [showShare, setShowShare] = useState(false)

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Select Workout</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h2 className='ms-3 text-dark f1'>{workout.name}</h2>
        {workout.workout.map((exercises, index) => <HomeExerciseCard key={index} exercises={exercises}/>)}
        <div className='d-flex flex-column'>
          <BeginWorkoutBtn workout={workout}/>
          <CancelWorkoutBtn workoutId={workout._id}/>
          <ShareWorkoutBtn/>
        </div>
      </Modal.Body>
    </Modal>
  )
}