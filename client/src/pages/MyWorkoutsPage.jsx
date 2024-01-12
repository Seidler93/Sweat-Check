import { useState, useEffect, useNavigate  } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_WORKOUTS_BY_USER } from '../utils/queries';
import Auth from '../utils/auth';
import MyWorkoutsCard from '../components/MyWorkoutsCard';

export default function MyWorkoutsPage() {
  const [workouts, setWorkouts] = useState([])

  const { loading: loadingFirst, data: dataFirst } = useQuery(QUERY_WORKOUTS_BY_USER, {
    variables: { userId: Auth.getProfile().data._id },
  });

  function SortedWorkouts() {
    const sortedWorkouts = [...workouts].sort((a, b) => {
      const dateA = new Date(a.dateCompleted);
      const dateB = new Date(b.dateCompleted);
  
      // Compare dates
      return dateB - dateA;
    });

    console.log(sortedWorkouts);
  
    return (
      <>
        {sortedWorkouts.map((workout, index) => (
          <MyWorkoutsCard workout={workout} key={index} />
        ))}
      </>
    );
  }

  useEffect(() => {
    const myWorkouts = dataFirst?.getWorkoutsByUserId;
    setWorkouts(myWorkouts);
    // console.log(myWorkouts);
  }, [dataFirst]);

  return (
    <div className='hp d-flex flex-wrap justify-content-center'>
      {/* {workouts?.map((workout, index) => <MyWorkoutsCard workout={workout} key={index} />)} */}
      {workouts && <SortedWorkouts/>}
    </div>
  );
};