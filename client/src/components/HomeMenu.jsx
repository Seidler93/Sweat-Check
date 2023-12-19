import { Link } from 'react-router-dom';

export default function Homemenu ({ setShowMenu }) {
  return (
    <div className="d-flex flex-column home-menu hp">
        <Link to={'/'} className="menu-option" onClick={() => setShowMenu(false)}>Home</Link>
        <Link to={'/library'} className="menu-option">Program Library</Link>
        <Link to={'/profile/me'} className="menu-option">My Profile</Link>
        <Link to={'/calendar'} className="menu-option">Calendar</Link>
        <Link to={'/settings'}className="menu-option">Settings</Link>
        <Link to={'/myStats'} className="menu-option">Stats</Link>
        <Link to={'/friends'} className="menu-option">Friends</Link>
        <Link to={'/exercise'} className="menu-option">Exercises</Link>
        <Link to={'/exercise'} className="menu-option">Communities/clubs</Link>
    </div>
  );
};



