import { useState, useEffect  } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header/index'
import HomeMenu from '../components/HomeMenu';

export default function StorePage() {
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
          <Link to={`/store/${productId}`}>program one</Link>
          <Link to={`/store/${productId}`}>program two</Link>
          <Link to={`/store/${productId}`}>program three</Link>
        </>
      )}
    </>
  );
};