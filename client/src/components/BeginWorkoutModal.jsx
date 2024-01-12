import Modal from 'react-bootstrap/Modal';
import HomeExerciseCard from './HomePageUI/HomeExerciseCard';
import { useMutation } from '@apollo/client';
import { CREATE_WORKOUT } from '../utils/mutations';
import { useUserContext } from "../utils/UserContext";
import Auth from '../utils/auth';
import removeTypename from '../functions/helperFunctions';
import { useNavigate } from 'react-router-dom';
import BeginWorkoutBtn from './BeginWorkoutBtn';

export default function BeginWorkoutModal({handleClose, workout, show}) {
  const [createWorkout, { createWorkoutError, createWorkoutData }] = useMutation(CREATE_WORKOUT);
  const {setCurrentWorkout} = useUserContext()
  const navigate = useNavigate();
  
  function setSetsIncomplete(workout) {
    workout.workout.forEach((supersets) => {
      supersets.exercises.forEach((exercise) => {
        exercise.sets.forEach((set) => {
          set.completed = false;
        });
      });
    });
  
    return workout;
  }

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
      
      localStorage.setItem('currentWorkout', JSON.stringify(setSetsIncomplete(data.createWorkout)));
      setCurrentWorkout(data.createWorkout);
      navigate(`/workout/${workout._id}`);
    } catch (e) {  
      console.error(e);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Select Workout</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h2 className='ms-3 text-dark f1'>{workout.name}</h2>
        {workout.workout.map((exercises, index) => <HomeExerciseCard key={index} exercises={exercises}/>)}
        <BeginWorkoutBtn workout={workout}/>
      </Modal.Body>
    </Modal>
  )
}