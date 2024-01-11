import Modal from 'react-bootstrap/Modal';
import { useState, useEffect  } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import HomeExerciseCard from './HomeExerciseCard';

export default function HomeWorkoutCard({ workout }) {
  const [show, setShow] = useState(false);
  //console.log(workout);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className='program-btn' onClick={handleShow}>
        <h3>{workout.name}</h3>
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select Workout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2 className='ms-3 text-dark'>{workout.name}</h2>
          {workout.workout.map((exercises) => (
            <HomeExerciseCard exercises={exercises}/>
          ))}
          <div className='d-flex flex-column'>
            <Link to={`/workout/${workout._id}`} className='modal-btn'>Begin Workout</Link>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};