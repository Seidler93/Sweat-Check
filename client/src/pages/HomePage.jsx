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
        <HomeMenu />
      ) : (
        <>
          {/* when you click the workout button, it will as you if you want to continue to your current program */}
          <button>Workout</button>
          {/* query to db to find everything that is for sale here */}
          <Link to={'/store/programId'}>buy program</Link>
          <Link to={'/store/workoutId'}>buy workout</Link>
          <Link to={'/store'}>view more in the store...</Link>
        </>
      )}
    </>
  );
}