import { useState, useEffect  } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header/index'
import HomeMenu from '../components/HomeMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { Button } from 'bootstrap';
import ExerciseCard from '../components/NewWorkout/exerciseCard';

export default function NewWorkoutPage() {
  const [showMenu, setShowMenu] = useState(false);
  const [newWorkout, setNewWorkout] = useState([]);
  const [addExercise, setAddExercise] = useState(false);
  const [exerciseInput, setExerciseInput] = useState('');
  
  let workout = []
  const handleAddExercise = () => {
    // Use the current value of exerciseInput
    const newExercise = [{ 
        exerciseName: exerciseInput,
     }];
  
    // Update the workout array with the new exercise
    setNewWorkout(prevWorkout => [...prevWorkout, newExercise]);
  
    console.log('Adding exercise:', exerciseInput);
  
    // Clear the input field after adding the exercise
    setExerciseInput('');
    setAddExercise(false);
  };  

  console.log(newWorkout);

  const addToSuperSet = (newSSExercise, supersetIndex) => {
    setNewWorkout((prevWorkout) => {
      const updatedWorkout = [...prevWorkout];
      // Get the exercise group at the specified index
      const exerciseGroup = [...updatedWorkout[supersetIndex]];
      // Add a new exercise to the exercise group
      const updatedExerciseGroup = [...exerciseGroup, { exerciseName: newSSExercise }];
  
      // Update the exercise group in the workout array
      updatedWorkout[supersetIndex] = [ ...updatedExerciseGroup ];
  
      return updatedWorkout;
    });
  };
  
  console.log(newWorkout);

  return (
    <>
      <Header showMenu={showMenu} setShowMenu={setShowMenu} />
      {showMenu ? (
        <HomeMenu />
        ) : (
        <div className='mx-10px hp'>
          <div className='d-flex flex-column my-2'>
            {newWorkout.map((exercises, index) => <ExerciseCard superset={exercises} index={index} addToSuperSet={addToSuperSet}/>)}
          </div>
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
            <button className='modal-btn me-1' onClick={() => setAddExercise(!addExercise)}>
              <FontAwesomeIcon className='pe-3' icon={faPlus} />
              Add exercise
            </button>
            <button className='modal-btn ms-1'>
              <FontAwesomeIcon className='pe-3' icon={faPlus} />
              Add circuit
            </button>
          </div>
        </div>
      )}
    </>
  );
}