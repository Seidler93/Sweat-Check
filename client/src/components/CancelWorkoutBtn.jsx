import { useUserContext } from "../utils/UserContext";
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { DELETE_WORKOUT } from '../utils/mutations';

export default function CancelWorkoutBtn({workoutId}) {
  const {checkedIn, setCheckedIn, currentWorkout, setCurrentWorkout} = useUserContext()
  const [deleteWorkout, { updateWorkoutError, updateWorkoutData }] = useMutation(DELETE_WORKOUT);
  const navigate = useNavigate();
  const {myWorkouts} = useParams()
  console.log(myWorkouts);

  const handleCancelWorkout = async () => {
    console.log({ workoutId: workoutId, userId: Auth.getProfile().data._id });
    try {

      const { data } = await deleteWorkout({
        variables: { workoutId: workoutId, userId: Auth.getProfile().data._id },
      });
      
      if (!myWorkouts) {
        localStorage.removeItem('currentWorkout');
        setCheckedIn(false);
        setCurrentWorkout({})
        navigate('/');
      } else {
        window.location.reload();
      }

    } catch (e) {  
      console.error(e);
    }
  };

  return (
    <button onClick={() => handleCancelWorkout()} className='modal-btn mt-1 bg-danger'>{myWorkouts ? 'Delete' : 'Cancel'}</button>
  )
}