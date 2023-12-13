import { useState, useEffect  } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header/index'
import HomeMenu from '../components/HomeMenu';

export default function LoginPage() {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      <Header showMenu={showMenu} setShowMenu={setShowMenu} />
      {showMenu ? (
        <HomeMenu />
        ) : (
        <>
          {/* put code for the page here */}
          <h2>login</h2>
        </>
      )}
    </>
  );
};