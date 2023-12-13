import { useState, useEffect  } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header/index'
import HomeMenu from '../components/HomeMenu';

export default function MyStatsPage() {
  const [showMenu, setShowMenu] = useState(false);
  const productId = 1
  return (
    <>
      <Header showMenu={showMenu} setShowMenu={setShowMenu} />
      {showMenu ? (
        <HomeMenu />
        ) : (
          <>
          {/* query for all programs and workouts that are available to user and display here */}
          <p>stat 1</p>
          <p>stat 2</p>
          <p>stat 3</p>
          <p>stat 4</p>
        </>
      )}
    </>
  );
};