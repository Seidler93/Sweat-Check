import { Link } from 'react-router-dom';

export default function Homemenu () {
  return (
    <div className="d-flex flex-column pt-5 mt-4">
        <Link to={'/'} className="menu-option bg-dark">Home</Link>
        <Link to={'/library'} className="menu-option bg-dark">Program Library</Link>
        <Link to={'/profile/me'} className="menu-option bg-dark">My Profile</Link>
        <Link to={'/calendar'} className="menu-option bg-dark">Calendar</Link>
        <Link to={'/settings'}className="menu-option bg-dark">Settings</Link>
        <Link to={'/myStats'} className="menu-option bg-dark">Stats</Link>
        <Link to={'/friends'} className="menu-option bg-dark">Friends</Link>
        <Link to={'/exercise'} className="menu-option bg-dark">Exercises</Link>
        <Link to={'/exercise'} className="menu-option bg-dark">Communities/clubs</Link>
    </div>
  );
};



