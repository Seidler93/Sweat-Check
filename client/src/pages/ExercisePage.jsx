import { useState, useEffect  } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header/index'
import HomeMenu from '../components/HomeMenu';

export default function ExercisePage() {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      {/* put code for the page here */}
      <p>list of exercises</p>
      <p>create exercise</p>
    </>
  );
};