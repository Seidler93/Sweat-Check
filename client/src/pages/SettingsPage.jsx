import { useState, useEffect  } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header/index'
import HomeMenu from '../components/HomeMenu';
import Auth from '../utils/auth';

export default function SettingsPage() {
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    Auth.logout()
  }

  return (
    <div className="d-flex flex-column home-menu hp">
      <h2 className='text-center pt-3'>Settings</h2>
      <Link to={'/library'} className="menu-option">Workout Settings</Link>
      <Link to={'/profile/me'} className="menu-option">Edit Information</Link>
      <Link to={'/calendar'} className="menu-option">Subscriptions</Link>
      <Link to={'/settings'}className="menu-option">Payment Methods</Link>
      <Link to={'/myStats'} className="menu-option">Notifications</Link>
      <Link to={'/friends'} className="menu-option">Contact Us</Link>
      <Link to={'/exercise'} className="menu-option">FAQ</Link>
      <button onClick={() => handleLogout()} className="menu-option">Logout</button>
    </div>
  );
};
