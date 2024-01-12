import { useUserContext } from "../utils/UserContext";
import { useMutation, useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { UPDATE_WORKOUT } from '../utils/mutations';
import Modal from 'react-bootstrap/Modal';
import removeTypename from '../functions/helperFunctions';

export default function CompleteWorkoutComp({show, handleClose}) {
  const {checkedIn, setCheckedIn, currentWorkout, setCurrentWorkout} = useUserContext()
  const [updateWorkout, { updateWorkoutError, updateWorkoutData }] = useMutation(UPDATE_WORKOUT);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setCurrentWorkout((prevCurrentWorkout) => ({
      ...prevCurrentWorkout,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

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
      // window.location.reload();

    } catch (e) {  
      console.error(e);
    }
  };

  const handleCompleteWorkout = (event) => {
    // Prevent page reload by default
    event.preventDefault();    
    
    updateWorkoutInDB(currentWorkout)
  };

  return (
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
  )
}