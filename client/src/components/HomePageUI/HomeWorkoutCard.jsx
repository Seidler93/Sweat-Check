import Modal from 'react-bootstrap/Modal';
import { useState, useEffect  } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { useMutation } from '@apollo/client';
import HomeExerciseCard from './HomeExerciseCard';
import { CREATE_WORKOUT } from '../../utils/mutations';
import { useUserContext } from "../../utils/UserContext";
import Auth from '../../utils/auth';
import removeTypename from '../../functions/helperFunctions';

export default function HomeWorkoutCard({ workout }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [createWorkout, { createWorkoutError, createWorkoutData }] = useMutation(CREATE_WORKOUT);
  const {setCurrentWorkout} = useUserContext()
  const navigate = useNavigate();

  const handleBeginWorkout = async () => {
    const newWorkout = {
      originalId: workout._id,
      userId: Auth.getProfile().data._id,
      name: workout.name, 
      description: workout.description, 
      dateCompleted: Auth.getDate(Date.now()),
      template: false,
      workout: workout.workout,
    }
  
    const formattedWorkout = removeTypename(newWorkout);
    console.log(formattedWorkout);
  
    try {
      const { data } = await createWorkout({
        variables: { workoutInput: formattedWorkout },
      });
  
      localStorage.setItem('currentWorkout', JSON.stringify(data.createWorkout));
      setCurrentWorkout(data.createWorkout);
      navigate(`/workout/${workout._id}`);
    } catch (e) {  
      console.error(e);
    }
  };

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
            <button onClick={() => handleBeginWorkout()} className='modal-btn'>Begin Workout</button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};