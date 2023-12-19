import Header from '../components/Header/index'
import HomeMenu from '../components/HomeMenu';
import { useState, useEffect  } from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const [showMenu, setShowMenu] = useState(false);
 
  return (
    <>
      <Header showMenu={showMenu} setShowMenu={setShowMenu} />
      {showMenu ? (
        <HomeMenu showMenu={showMenu} setShowMenu={setShowMenu}/>
      ) : (
        <div className='hp d-flex flex-column'>
          {/* when you click the workout button, it will as you if you want to continue to your current program */}
          <button className='workout-btn'>Workout</button>

        
            <h2 className='ms-3'>My Programs</h2>
            <div className='home-programs'>
              <button className='program-btn'><Link to={'/store/programId'}>Program 1</Link></button>
              <button className='program-btn'><Link to={'/store/programId'}>Program 2</Link></button>
              <button className='program-btn'><Link to={'/store/programId'}>Program 3</Link></button>
              <button className='program-btn'><Link to={'/store/programId'}>Program 4</Link></button>
              <button className='program-btn'><Link to={'/store/programId'}>Find more...</Link></button>              
            </div>
          {/* query to db to find everything that is for sale here */}
            <h2 className='ms-3'>Featured Workouts</h2>
            <div className='home-programs'>
              <button className='program-btn'><Link to={'/store/programId'}>Program 1</Link></button>
              <button className='program-btn'><Link to={'/store/programId'}>Program 2</Link></button>
              <button className='program-btn'><Link to={'/store/programId'}>Program 3</Link></button>
              <button className='program-btn'><Link to={'/store/programId'}>Program 4</Link></button>
              <button className='program-btn'><Link to={'/store/programId'}>Find more...</Link></button>              
            </div> 
            <h2 className='ms-3'>Featured Programs</h2> 
            <div className='home-programs'>
              <button className='program-btn'><Link to={'/store/programId'}>Program 1</Link></button>
              <button className='program-btn'><Link to={'/store/programId'}>Program 2</Link></button>
              <button className='program-btn'><Link to={'/store/programId'}>Program 3</Link></button>
              <button className='program-btn'><Link to={'/store/programId'}>Program 4</Link></button>
              <button className='program-btn'><Link to={'/store/programId'}>Find more...</Link></button>              
            </div> 
          <button className='see-all-btn'><Link to={'/store'}>See All</Link></button>

            <h2 className='ms-3'>Friends</h2> 
            <div className='d-flex flex-column'>
              <button className='friend-btn'><Link to={'/store/friendId'}>First Last</Link><p>Status</p></button>
              <button className='friend-btn'><Link to={'/store/friendId'}>First Last</Link><p>Status</p></button>
              <button className='friend-btn'><Link to={'/store/friendId'}>First Last</Link><p>Status</p></button>
              <button className='friend-btn'><Link to={'/store/friendId'}>First Last</Link><p>Status</p></button>
              <button className='friend-btn'><Link to={'/store/friendId'}>First Last</Link><p>Status</p></button>              
            </div> 
          <Link to={'/store/programId'}>buy program</Link>
          {/* <Link to={'/store/workoutId'}>buy workout</Link> */}
          {/* <Link to={'/store'}>view more in the store...</Link> */}
        </div>
      )}
    </>
  );
}