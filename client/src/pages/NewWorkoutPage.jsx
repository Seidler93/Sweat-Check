import { useState, useEffect  } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header/index'
import HomeMenu from '../components/HomeMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { Button } from 'bootstrap';
import ExerciseCard from '../components/NewWorkout/exerciseCard';
import { useUserContext } from "../utils/UserContext";

export default function NewWorkoutPage() {
  const [showMenu, setShowMenu] = useState(false);
  const [newWorkout, setNewWorkout] = useState([]);
  const [addExercise, setAddExercise] = useState(true);
  const [exerciseInput, setExerciseInput] = useState('');
  const {checkedIn, setCheckedIn} = useUserContext()
  
  useEffect(() => {
    // Move the setCheckedIn call inside useEffect
    setCheckedIn(true);
  }, []); // The empty dependency array ensures this runs only once on mount

  let workout = {}
  const handleAddExercise = () => {
    // Use the current value of exerciseInput
    const newExercise = [{ 
        exerciseName: exerciseInput,
        sets: [{reps: '', weight: '', completed: false}]
     }];
  
    // Update the workout array with the new exercise
    setNewWorkout(prevWorkout => [...prevWorkout, newExercise]);
  
    // console.log('Adding exercise:', exerciseInput);
  
    // Clear the input field after adding the exercise
    setExerciseInput('');
    setAddExercise(false);
  };  

  // console.log(newWorkout);

  const addToSuperSet = (newSSExercise, supersetIndex) => {
    setNewWorkout((prevWorkout) => {
      const updatedWorkout = [...prevWorkout];
      // Get the exercise group at the specified index
      const exerciseGroup = [...updatedWorkout[supersetIndex]];

      // Add a new exercise to the exercise group
      const updatedExerciseGroup = [...exerciseGroup, { 
        exerciseName: newSSExercise,
        sets: [{reps: '', weight: '', completed: false}]
      }];
      
      // Update the exercise group in the workout array
      updatedWorkout[supersetIndex] = [ ...updatedExerciseGroup ];      

      return updatedWorkout;
    });
  };

  const updateExercise = (exerciseObject, setIndex, exerciseIndex, supersetIndex) => {
    setNewWorkout((prevWorkout) => {
      const updatedWorkout = [...prevWorkout];
      // Get the exercise group at the specified index
      const exerciseGroup = [...updatedWorkout[supersetIndex]];

      // Update exercise sets
      exerciseGroup[exerciseIndex].sets[setIndex] = exerciseObject     
      return updatedWorkout;
    });
  }

  const addSetToExercise = (exerciseIndex, supersetIndex, setCount) => {
    setNewWorkout((prevWorkout) => {
      const updatedWorkout = [...prevWorkout];
      // Get the exercise group at the specified index
      const exerciseGroup = [...updatedWorkout[supersetIndex]];

      // Update sets with a new empty set
      const newSets = [...exerciseGroup[exerciseIndex].sets, {reps: '', weight: '', completed: false}]
      exerciseGroup[exerciseIndex].sets = newSets  
      return updatedWorkout;
      
      // if (newSets.length == setCount) {
      //   return updatedWorkout;
      // } else {
      //   return addSetToExercise(exerciseIndex, supersetIndex, setCount)
      // }
    });
  }

  // useEffect(() => {
  //   const storedWorkout = JSON.parse(localStorage.getItem('woip'));
  //   if (storedWorkout) {
  //     setNewWorkout(storedWorkout);
  //     setAddExercise(false)
  //   }
  // }, [])

  useEffect(() => {
    // Save the updated workout to local storage
    localStorage.setItem('woip', JSON.stringify(newWorkout));
    localStorage.setItem('checkedIn', JSON.stringify(Date.now));
  }, [newWorkout]);

  const history = useNavigate();

  const handleCompleteWorkout = () => {
    console.log('deleted');
    localStorage.removeItem('woip');
    setCheckedIn(false)
    const workouts = localStorage.getItem('workouts') || '';
    const newWorkouts = [...workouts, newWorkout]
    localStorage.setItem('workouts', JSON.stringify(newWorkouts));
    // Redirect to the homepage
    history.push('/');
  }
  
  // console.log(newWorkout);

  return (
    <>
      <Header showMenu={showMenu} setShowMenu={setShowMenu} />
      {showMenu ? (
        <HomeMenu />
        ) : (
        <div className='mx-10px hp d-flex flex-column'>
          <div className='d-flex flex-column my-2'>
              {newWorkout.map((exercises, index) => <ExerciseCard key={index} superset={exercises} index={index} addToSuperSet={addToSuperSet} updateExercise={updateExercise} addSetToExercise={addSetToExercise}/>)}
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
            <button className='modal-btn me-1' onClick={() => setAddExercise(true)}>
              <FontAwesomeIcon className='pe-3' icon={faPlus} />
              Add exercise
            </button>
            <button className='modal-btn ms-1'>
              <FontAwesomeIcon className='pe-3' icon={faPlus} />
              Add circuit
            </button>
          </div>
          {newWorkout.length > 0 ? <button onClick={() => handleCompleteWorkout()} className='modal-btn mt-1'>Complete Workout</button> : '' }
        </div>
      )}
    </>
  );
}