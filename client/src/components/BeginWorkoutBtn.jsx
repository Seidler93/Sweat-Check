import { useMutation } from '@apollo/client';
import { CREATE_WORKOUT } from '../utils/mutations';
import { useUserContext } from "../utils/UserContext";
import Auth from '../utils/auth';
import removeTypename from '../functions/helperFunctions';
import { useNavigate } from 'react-router-dom';

export default function BeginWorkoutBtn({workout}) {
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
    <button onClick={() => handleBeginWorkout()} className='modal-btn'>Begin Workout</button>
  )
}