import { useState, useEffect  } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header/index'
import HomeMenu from '../components/HomeMenu';

export default function StorePage() {
  const [showMenu, setShowMenu] = useState(false);
  const productId = 1
  return (
    <Link to={`/store/${productId}`}>program one</Link>
  );
};