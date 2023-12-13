import { useState, useEffect  } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header/index'
import HomeMenu from '../components/HomeMenu';

export default function JustWorkoutPage() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <Header showMenu={showMenu} setShowMenu={setShowMenu} />
      {showMenu ? (
        <HomeMenu />
        ) : (
          <>
          {/* this will allow you to create the workout and then fill out the workout as you go */}
          <h2>just workout</h2>
        </>
      )}
    </>
  );
};