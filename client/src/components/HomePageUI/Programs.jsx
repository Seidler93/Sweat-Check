import { Link } from 'react-router-dom';
import { useState, useEffect  } from 'react';
import HomeWorkoutCard from './HomeWorkoutCard';
import { useUserContext } from "../../utils/UserContext";
import { Icon } from '@iconify/react';

export default function Programs({loading}) {
  const {checkedIn, setCheckedIn, currentWorkout, setCurrentWorkout, user, setUser} = useUserContext()

  function SortedWorkouts() {
    const sortedWorkouts = user.workouts?.sort((a, b) => {
      const dateA = new Date(a.dateCompleted);
      const dateB = new Date(b.dateCompleted);
  
      // Compare dates
      return dateB - dateA;
    });

    // console.log(sortedWorkouts);
  
    return (
      <>
        {sortedWorkouts && sortedWorkouts.map((workout, index) => (
          <HomeWorkoutCard workout={workout} key={index} />
        ))}
      </>
    );
  }
  
  return (
    <>
      <h2 className='ms-3 mt-1'>My Workouts</h2>
      <div className='home-programs d-flex'>
        {loading ? <Icon icon='line-md:loading-loop' width="100" height="100" className='me-1' color="white" /> : <SortedWorkouts/>}
        <button className='program-btn'><Link to={'/store/programId'}>Find workouts</Link></button>              
      </div>
      <h2 className='ms-3 mt-4'>My Programs</h2>
      <div className='home-programs'>
        <button className='program-btn'><Link to={'/store/programId'}>Program 1</Link></button>
        <button className='program-btn'><Link to={'/store/programId'}>Program 2</Link></button>
        <button className='program-btn'><Link to={'/store/programId'}>Program 3</Link></button>
        <button className='program-btn'><Link to={'/store/programId'}>Program 4</Link></button>
        <button className='program-btn'><Link to={'/store/programId'}>Find more...</Link></button>              
      </div>
      {/* query to db to find everything that is for sale here */}
      <h2 className='ms-3 mt-4'>Featured Workouts</h2>
      <div className='home-programs'>
        <button className='program-btn'><Link to={'/store/programId'}>Program 1</Link></button>
        <button className='program-btn'><Link to={'/store/programId'}>Program 2</Link></button>
        <button className='program-btn'><Link to={'/store/programId'}>Program 3</Link></button>
        <button className='program-btn'><Link to={'/store/programId'}>Program 4</Link></button>
        <button className='program-btn'><Link to={'/store/programId'}>Find more...</Link></button>              
      </div> 
      <h2 className='ms-3 mt-4'>Featured Programs</h2> 
      <div className='home-programs'>
        <button className='program-btn'><Link to={'/store/programId'}>Program 1</Link></button>
        <button className='program-btn'><Link to={'/store/programId'}>Program 2</Link></button>
        <button className='program-btn'><Link to={'/store/programId'}>Program 3</Link></button>
        <button className='program-btn'><Link to={'/store/programId'}>Program 4</Link></button>
        <button className='program-btn'><Link to={'/store/programId'}>Find more...</Link></button>              
      </div> 
      <button className='see-all-btn mt-4'><Link to={'/store'}>See All</Link></button> 
    </>
  );
};