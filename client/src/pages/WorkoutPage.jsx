import { useState, useEffect  } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import ExerciseCard from '../components/NewWorkout/exerciseCard';
import { useUserContext } from "../utils/UserContext";
import CompleteWorkoutComp from '../components/CompleteWorkoutComp';
import CancelWorkoutBtn from '../components/CancelWorkoutBtn';

export default function WorkoutPage() {
  const [addExercise, setAddExercise] = useState(true);
  const [exerciseInput, setExerciseInput] = useState('');
  const [show, setShow] = useState(false);  
  const {checkedIn, setCheckedIn, currentWorkout, setCurrentWorkout} = useUserContext()
  const navigate = useNavigate()

  useEffect(() => {
    // Move the setCheckedIn call inside useEffect
    if (!checkedIn) {
      setCheckedIn(true);
    } 

    const workout = JSON.parse(localStorage.getItem('currentWorkout')) || false;
    
    if (workout) {
      setCurrentWorkout(workout)
    } else {
      navigate('/newWorkoutPage')
    }
  }, []);

  useEffect(() => {
    console.log('workout:', currentWorkout);
    localStorage.setItem('currentWorkout', JSON.stringify(currentWorkout));
  }, [currentWorkout]);

  const handleAddExercise = () => {
    // Use the current value of exerciseInput
    const newExercise = [{ 
        exerciseName: exerciseInput,
        sets: [{reps: 0, weight: 0, completed: false}]
     }];
  
    // Update the workout array with the new exercise
    setCurrentWorkout(prevCurrentWorkout => {
      return {...prevCurrentWorkout, workout: [...prevCurrentWorkout.workout, {exercises: newExercise}]}
    });
    
    // Clear the input field after adding the exercise
    setExerciseInput('');
    setAddExercise(false);
  };  

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <> 
      <div className='mx-10px hp d-flex flex-column'>
        {currentWorkout.workout && (
          <div className='d-flex flex-column my-2'>
              {currentWorkout.workout.map((exercises, index) => <ExerciseCard key={index} superset={exercises} index={index}/>)}
          </div>
        )}
        {addExercise ? (
          <div className='d-flex align-items-center mb-2 justify-content-between'>
            <input
              type="text"
              onChange={(e) => setExerciseInput(e.target.value)}
              value={exerciseInput}
              className="form-control"
              placeholder="Enter exercise"
              aria-describedby="basic-addon1"
            />
            <button type='submit' onClick={() => handleAddExercise()} className='ms-2 add-exercise-btn'>
              <FontAwesomeIcon className='text-white' icon={faPlus} />
            </button>
          </div>
        ) : ''}
        <div className='d-flex'>
          <button className='modal-btn me-1' onClick={() => setAddExercise(true)}>
            <FontAwesomeIcon className='pe-3' icon={faPlus} />
            Add exercise
          </button>
          <button className='modal-btn ms-1'>
            <FontAwesomeIcon className='pe-3' icon={faPlus} />
            Add circuit
          </button>
        </div>
        {currentWorkout.workout?.length > 0 && <button onClick={handleShow} className='modal-btn mt-1'>Complete Workout</button>}
        <CancelWorkoutBtn workoutId={currentWorkout._id}/>
      </div>
      <CompleteWorkoutComp show={show} handleClose={handleClose}/>
    </>
  );
}