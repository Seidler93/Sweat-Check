import { Link, useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage, faBars, faDumbbell, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons"
import { useState, useEffect } from 'react';
import { useUserContext } from "../../utils/UserContext";
import Homemenu from '../HomeMenu';

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

  return (
    <>
      <Nav className='f2 bg-dark d-flex justify-content-between fixed-top rel'>
        <div className='d-flex align-items-center'>
          <Nav.Item className='clear' onClick={() => setShowMenu(false)}>
            <Link  to={'/'} className='ps-4 clear'>Sweat Check</Link>
          </Nav.Item>
        </div>
        
        <div className='d-flex pe-1'>
          <Nav.Item className='py-2 px-1 clear' onClick={() => handleIconPress()}>
            <FontAwesomeIcon  icon={faDumbbell} style={{color: "#ffffff",}} className={`me-3 ${checkedIn ? 'checked-in' : ''}`}/>
          </Nav.Item>
          <Nav.Item className='py-2 px-1 clear'>
            <Link to={'/conversations'} onClick={() => setShowMenu(false)}>
              <FontAwesomeIcon icon={faMessage} style={{color: "#ffffff",}} className='message-icon'/>
            </Link>
          </Nav.Item>
          <Nav.Item className='p-2'>
            <Nav.Link onClick={() => setShowMenu(!showMenu)}>            
              <FontAwesomeIcon
                icon={showMenu ? faXmark : faBars}
                style={{ color: "#ffffff" }}
                className={`menu-icon`}
              />
            </Nav.Link>
          </Nav.Item>             
        </div>
      </Nav>
      <Homemenu showMenu={showMenu} setShowMenu={setShowMenu}/>
    </>
  );
};
