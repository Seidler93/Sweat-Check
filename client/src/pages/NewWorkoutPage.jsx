import { useState, useEffect  } from 'react';
import { Link, useParams, useNavigate, redirect } from 'react-router-dom';
import Header from '../components/Header/index'
import HomeMenu from '../components/HomeMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import ExerciseCard from '../components/NewWorkout/exerciseCard';
import { useUserContext } from "../utils/UserContext";
import Modal from 'react-bootstrap/Modal';
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { CREATE_WORKOUT, UPDATE_WORKOUT } from '../utils/mutations';

export default function NewWorkoutPage() {
  const [showMenu, setShowMenu] = useState(false);
  const [addExercise, setAddExercise] = useState(true);
  const [exerciseInput, setExerciseInput] = useState('');
  const [show, setShow] = useState(false);  
  const [createWorkout, { createWorkoutError, createWorkoutData }] = useMutation(CREATE_WORKOUT);
  const [updateWorkout, { updateWorkoutError, updateWorkoutData }] = useMutation(UPDATE_WORKOUT);
  const {checkedIn, setCheckedIn, currentWorkout, setCurrentWorkout} = useUserContext()
  const navigate = useNavigate();

  useEffect(() => {
    // Move the setCheckedIn call inside useEffect
    if (!checkedIn) {
      setCheckedIn(true);
    } 

    const workout = JSON.parse(localStorage.getItem('currentWorkout')) || false;
    
    if (workout) {
      setCurrentWorkout(workout)
    } else {
      getNewWorkoutID()
    }

  }, []);

  useEffect(() => {
    console.log('workout:', currentWorkout);
    localStorage.setItem('currentWorkout', JSON.stringify(currentWorkout));
  }, [currentWorkout]);

  const getNewWorkoutID = async () => {
    const workoutInput = currentWorkout

    try {
      const { data } = await createWorkout({
        variables: { workoutInput },
      });

      setCurrentWorkout({
        _id: data.createWorkout._id, 
        originalId: null,
        userId: Auth.getProfile().data._id,
        name: '', 
        description: '', 
        dateCompleted: Auth.getDate(Date.now()),
        template: false,
        workout: [],
      });

    } catch (e) {
      console.error(e);
    }
  };

  const updateWorkoutInDB = async (wo) => {
    try {
      const wts = {
        originalId: null,
        userId: wo.userId,
        name: wo.name, 
        description: wo.description, 
        dateCompleted: wo.dateCompleted,
        template: wo.template,
        workout: wo.workout,
      }

      const { data } = await updateWorkout({
        variables: { workoutId: wo._id, updatedWorkout: wts },
      });

      localStorage.removeItem('currentWorkout');
      setCheckedIn(false);
      setCurrentWorkout({})
      navigate('/');
      // window.location.href = '/';

    } catch (e) {  
      console.error(e);
    }
  };
  
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

  const handleCompleteWorkout = (event) => {
    // Prevent page reload by default
    event.preventDefault();    
    
    updateWorkoutInDB(currentWorkout)
  };
  
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setCurrentWorkout((prevCurrentWorkout) => ({
      ...prevCurrentWorkout,
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
          {currentWorkout.workout ? <button onClick={handleShow} className='modal-btn mt-1'>Complete Workout</button> : '' }
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
              name="name"
              type="text"
              value={currentWorkout.name}
              onChange={handleChange}
            />
            <input
              className="mb-2 p-3 login-input"
              placeholder="Description"
              name="description"
              type="text"
              value={currentWorkout.description}
              onChange={handleChange}
            />
            <label>
            <input
              type="checkbox"
              name="template"
              checked={currentWorkout.template}
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