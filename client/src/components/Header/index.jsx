import { Link, useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage, faBars, faDumbbell, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons"
import { useState, useEffect } from 'react';
import { useUserContext } from "../../utils/UserContext";
import Homemenu from '../HomeMenu';
import { Icon } from '@iconify/react';
import MenuBtn from './MenuBtn';

export default function Header () {
  const [showMenu, setShowMenu] = useState(false);
  const {checkedIn, setCheckedIn, currentWorkout, setCurrentWorkout} = useUserContext()
  const navigate = useNavigate();

  function handleIconPress() {
    setCheckedIn(true)
    setShowMenu(false)

    if (currentWorkout?._id) {
      navigate('/workout/woip')
    } else {
      localStorage.removeItem('currentWorkout');
      navigate('/newWorkoutPage')
    }
  }

  function handleMessagePress() {
    navigate('/conversations')
  }

  return (
    <>
      <Nav className='f2 bg-dark d-flex justify-content-between fixed-top'>
        <div className='d-flex align-items-center'>
          <Nav.Item className='clear' onClick={() => setShowMenu(false)}>
            <Link  to={'/'} className='ps-4 clear'>Sweat Check</Link>
          </Nav.Item>
        </div>
        
        <div className='d-flex pe-1'>
          <Nav.Item className='py-2 px-1 clear me-1' onClick={() => handleIconPress()}>
            <Icon icon='ic:round-search' width="40" height="40" color="white" />
          </Nav.Item>
          <Nav.Item className='py-2 px-1 clear me-1' onClick={() => handleIconPress()}>
            <Icon icon='mdi:weight-lifter' width="40" height="40" color={`${checkedIn ? 'blue' : 'white'}`} />
          </Nav.Item>
          <Nav.Item className='py-2 px-1 clear me-1' onClick={() => handleMessagePress()}>
            <Icon icon='bxs:message' width="40" height="40" color='white' />
          </Nav.Item>
          <MenuBtn showMenu={showMenu} setShowMenu={setShowMenu}/>
        </div>
      </Nav>
      <Homemenu showMenu={showMenu} setShowMenu={setShowMenu}/>
    </>
  );
};
