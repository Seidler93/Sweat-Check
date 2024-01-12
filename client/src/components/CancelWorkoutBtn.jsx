import { useUserContext } from "../utils/UserContext";
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { DELETE_WORKOUT } from '../utils/mutations';

export default function CancelWorkoutBtn() {
  const {checkedIn, setCheckedIn, currentWorkout, setCurrentWorkout} = useUserContext()
  const [deleteWorkout, { updateWorkoutError, updateWorkoutData }] = useMutation(DELETE_WORKOUT);
  const navigate = useNavigate();

  const handleCancelWorkout = async () => {
    console.log({ workoutId: currentWorkout._id, userId: Auth.getProfile().data._id });
    try {

      const { data } = await deleteWorkout({
        variables: { workoutId: currentWorkout._id, userId: Auth.getProfile().data._id },
      });

      localStorage.removeItem('currentWorkout');
      setCheckedIn(false);
      setCurrentWorkout({})
      navigate('/');

    } catch (e) {  
      console.error(e);
    }
  };

  return (
    <button onClick={() => handleCancelWorkout()} className='modal-btn mt-1 bg-danger'>Cancel</button>
  )
}