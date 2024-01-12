import { useState, useEffect  } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header/index'
import HomeMenu from '../components/HomeMenu';

export default function CreateWorkoutPage() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      {/* this will allow the user to create a workout to complete later */}
      <h2>create workout</h2>
    </>
  );
};