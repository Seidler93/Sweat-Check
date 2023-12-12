import { useState, useEffect  } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header/index'
import HomeMenu from '../components/HomeMenu';

const SettingsPage = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <Header showMenu={showMenu} setShowMenu={setShowMenu} />
      {showMenu ? (
        <HomeMenu />
        ) : (
          <>
          <h2>Settings</h2>
          <button>Edit Information</button>
          <button>Subscriptions</button>
          <button>Payment Methods</button>
          <button>Notifications</button>
          <button>Contact Us</button>
          <button>FAQ</button>
          <button>logout</button>
        </>
      )}
    </>
  );
};

export default SettingsPage;