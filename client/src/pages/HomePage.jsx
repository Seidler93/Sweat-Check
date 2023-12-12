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
          <button>Workout</button>
          {/* query to db to find everything that is for sale here */}
          <button>buy program</button>
          <button>buy workout</button>
        </>
      )}
    </>
  );
}