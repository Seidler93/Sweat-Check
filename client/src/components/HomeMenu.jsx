import { Link } from 'react-router-dom';

export default function Homemenu () {
  return (
    <div className="d-flex flex-column pt-5 mt-4">
        <button className="menu-option bg-dark">Program Library NEEDS PAGE</button>
        <Link to={'/profile/me'} className="menu-option bg-dark">My Profile</Link>
        <button className="menu-option bg-dark">Workout NEEDS PAGE</button>
        <Link to={'/settingsPage'}className="menu-option bg-dark">Settings</Link>
        <button className="menu-option bg-dark">Leaderboard NEEDS PAGE</button>
        <button className="menu-option bg-dark">Stats NEEDS PAGE</button>
        <button className="menu-option bg-dark">Progress NEEDS PAGE</button>
        <Link to={'/Friends'} className="menu-option bg-dark">Friends</Link>
        <Link to={'/exercisePage'} className="menu-option bg-dark">Exercises</Link>
    </div>
  );
};



