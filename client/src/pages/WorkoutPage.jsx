import { useState, useEffect  } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header/index'
import HomeMenu from '../components/HomeMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import ExerciseCard from '../components/NewWorkout/exerciseCard';
import { useUserContext } from "../utils/UserContext";
import Modal from 'react-bootstrap/Modal';
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { UPDATE_WORKOUT } from '../utils/mutations';

export default function NewWorkoutPage() {
  const [showMenu, setShowMenu] = useState(false);
  const [newWorkout, setNewWorkout] = useState([]);
  const [addExercise, setAddExercise] = useState(true);
  const [exerciseInput, setExerciseInput] = useState('');
  const [show, setShow] = useState(false);
  const {checkedIn, setCheckedIn, } = useUserContext()
  const [workoutId, setWorkoutId] = useState('')
  const [formState, setFormState] = useState({ workoutName: '', description: '', template: false });
  const [updateWorkout, { updateWorkoutError, updateWorkoutData }] = useMutation(UPDATE_WORKOUT);

  const navigate = useNavigate();

  const updateWorkoutInDB = async (wId, wo) => {
    console.log(wId, wo);
    try {
      const { data } = await updateWorkout({
        variables: { workoutId: wId, updatedWorkout: wo },
      });

    navigate('/');

    } catch (e) {  
      console.error(e);
    }
  };

  useEffect(() => {
    if (!checkedIn) {
      setCheckedIn(true);
    } 

    const storedWorkout = JSON.parse(localStorage.getItem('woip')) || '';

    if (storedWorkout) {
      console.log(true);
      setWorkoutId(storedWorkout.id)
      setNewWorkout(storedWorkout.workout);
      setAddExercise(false)
    }

  }, []);
  
  const handleAddExercise = () => {
    // Use the current value of exerciseInput
    const newExercise = [{ 
        exerciseName: exerciseInput,
        sets: [{reps: 0, weight: 0, completed: false}]
     }];
  
    // Update the workout array with the new exercise
    setNewWorkout(prevWorkout => [...prevWorkout, newExercise]);
  
    // console.log('Adding exercise:', exerciseInput);
  
    // Clear the input field after adding the exercise
    setExerciseInput('');
    setAddExercise(false);
  };

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
    });
  }

  useEffect(() => {
    console.log(workoutId, newWorkout);
    // Save the updated workout to local storage
    if (workoutId) {
      localStorage.setItem('woip', JSON.stringify({id: workoutId, workout: newWorkout}));
    }
  }, [newWorkout]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${month}/${day}/${year}`;
  }

  const handleCompleteWorkout = (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();
    const workoutDate = formatTimestamp(Date.now());
    localStorage.removeItem('woip');
    setCheckedIn(false);

    const workout = {
      originalId: null,
      userId: Auth.getProfile().data._id,
      name: formState.workoutName,
      description: formState.description,
      dateCompleted: workoutDate,
      template: formState.template,
      workout: newWorkout,
    };

    // const workouts = JSON.parse(localStorage.getItem('workouts')) || [];
    // // Filter out the newWorkout from workouts
    // const otherWorkouts = workouts.filter((existingWorkout) => existingWorkout._id !== workoutId);
    // const newWorkouts = [...otherWorkouts, {...workout, _id: workoutId,}]
    // localStorage.setItem('workouts', JSON.stringify(newWorkouts));      
    updateWorkoutInDB(workoutId, workout)
  }
  
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <>
      <Header showMenu={showMenu} setShowMenu={setShowMenu} />
      {showMenu ? (
        <HomeMenu />
        ) : (
        <div className='mx-10px hp d-flex flex-column'>
          <div className='d-flex flex-column my-2'>
            {newWorkout.map((exercises, index) => <ExerciseCard key={index} superset={exercises} index={index} addToSuperSet={addToSuperSet} updateExercise={updateExercise} addSetToExercise={addSetToExercise} woip={true}/>)}
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
          <button onClick={handleShow} className='modal-btn mt-1'>Complete Workout</button>
        </div>
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Complete Workout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="" onSubmit={(event) => handleCompleteWorkout(event)} className='d-flex flex-column'>
            <input
              className="mb-2 p-3 login-input"
              placeholder="Workout Name"
              name="workoutName"
              type="text"
              value={formState.workoutName}
              onChange={handleChange}
            />
            <input
              className="mb-2 p-3 login-input"
              placeholder="Description"
              name="description"
              type="text"
              value={formState.description}
              onChange={handleChange}
            />
            <label>
            <input
              type="checkbox"
              name="template"
              checked={formState.template}
              onChange={handleChange}
            />
            Save workout as Template
          </label>
            <button
              className="btn btn-block btn-primary"
              style={{ cursor: 'pointer' }}
              type="submit"
            >
              Complete Workout
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}