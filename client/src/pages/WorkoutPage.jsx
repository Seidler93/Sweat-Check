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
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_WORKOUT } from '../utils/mutations';
import removeTypename from '../functions/helperFunctions';

export default function WorkoutPage() {
  const [showMenu, setShowMenu] = useState(false);
  const [addExercise, setAddExercise] = useState(true);
  const [exerciseInput, setExerciseInput] = useState('');
  const [show, setShow] = useState(false);  
  const [updateWorkout, { updateWorkoutError, updateWorkoutData }] = useMutation(UPDATE_WORKOUT);
  const {checkedIn, setCheckedIn, currentWorkout, setCurrentWorkout} = useUserContext()
  const navigate = useNavigate();
  const { workoutId } = useParams()
  const { woip } = useParams() 

  useEffect(() => {
    // Make sure that the user is checked in for the workout
    if (!checkedIn) {
      setCheckedIn(true);
    } 
  }, []);

  useEffect(() => {
    console.log('workout:', currentWorkout);
    localStorage.setItem('currentWorkout', JSON.stringify(currentWorkout));
  }, [currentWorkout]);

  const updateWorkoutInDB = async () => {
    const wts = {
      originalId: currentWorkout.originalId,
      userId: currentWorkout.userId,
      name: currentWorkout.name, 
      description: currentWorkout.description, 
      dateCompleted: Auth.getDate(Date.now()),
      template: currentWorkout.template,
      workout: currentWorkout.workout,
    }

    const formattedWorkout = removeTypename(wts)
    console.log("workoutId:", currentWorkout._id, "updatedWorkout:", formattedWorkout);

    try {

      const { data } = await updateWorkout({
        variables: { workoutId: currentWorkout._id, updatedWorkout: formattedWorkout },
      });

      localStorage.removeItem('currentWorkout');
      setCheckedIn(false);
      setCurrentWorkout({})
      // Refresh the current page
      navigate('/');
      window.location.reload();

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
    
    updateWorkoutInDB()
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