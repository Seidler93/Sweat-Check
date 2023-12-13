import { useState, useEffect  } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header/index'
import HomeMenu from '../components/HomeMenu';

export default function LibraryPage() { 
  const [showMenu, setShowMenu] = useState(false);
  const ProgramId = 1
  const WorkoutId = 1
  return (
    <>
      <Header showMenu={showMenu} setShowMenu={setShowMenu} />
      {showMenu ? (
        <HomeMenu />
        ) : (
          <>
          {/* query for existing workouts and list them here with option to create a new workout */}
          {/* loop through the query result of workouts */}
          <Link to={`/program/${ProgramId}`}>Program 1</Link>
          <Link to={`/workout/${WorkoutId}`}>Workout 1</Link>
          <Link to={`/program/${ProgramId}`}>Program 1</Link>
          <Link to={`/justWorkout`}>Just Workout</Link>
        </>
      )}
    </>
  );
}