import { useState, useEffect  } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header/index'
import HomeMenu from '../components/HomeMenu';

export default function TEMPLATE() {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <p>show all workouts here</p>
  );
};