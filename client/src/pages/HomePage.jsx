import Header from '../components/Header/index'
import HomeMenu from '../components/HomeMenu';
import { useState, useEffect  } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { useUserContext } from "../utils/UserContext";
import Programs from '../components/HomePageUI/Programs';
import Friends from '../components/HomePageUI/Friends';

export default function WorkoutPage() {
  const [showMenu, setShowMenu] = useState(false);
  const [show, setShow] = useState(false);
  const [showWP, setShowWP] = useState(true);
  const [woip, setWoip] = useState([]);

  const {checkedIn, setCheckedIn} = useUserContext()

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleWP = () => setShowWP(true);
  const hanldeFriends = () => setShowWP(false);

  useEffect(() => {
    const storedWorkout = JSON.parse(localStorage.getItem('woip'));
    if (storedWorkout) {
      setCheckedIn(true);
    }
  }, [])

  return (
    <>
      <Header showMenu={showMenu} setShowMenu={setShowMenu} />
      {showMenu ? (
        <HomeMenu showMenu={showMenu} setShowMenu={setShowMenu}/>
      ) : (
        <div className='hp d-flex flex-column'>
          {/* when you click the workout button, it will as you if you want to continue to your current program */}
          <button variant="primary" onClick={handleShow} className='workout-btn'>Workout</button>
          <div className='home-programs p-3'>
            <button className={`bg-tr none mx-2 p-0 ${showWP ? 'profile-toggle-active' : ''}`} onClick={handleWP}><h2 className=''>Workouts/Programs</h2></button>
            <button className={`bg-tr none mx-2 p-0 ${!showWP ? 'profile-toggle-active' : ''}`} onClick={hanldeFriends}><h2 className=''>Friends</h2></button>
          </div>
          {showWP ? <Programs/> : <Friends/>}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Select Workout</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h2 className='ms-3 text-dark'>Current Program</h2>
              <button className='current-program-btn'><Link to={'/store/programId'}>Program 1</Link></button>
              <div className='d-flex flex-column'>
                <button className='modal-btn'><Link to={'/newWorkoutPage'}><FontAwesomeIcon className='pe-3' icon={faPlus} />New Workout</Link></button>
                {checkedIn ? <button className='modal-btn'><Link to={'/workout/woip'}>Resume Workout</Link></button> : ''}
                <div className='d-flex'>
                  <button className='modal-btn me-1'><Link to={'/store'}>Find Workout</Link></button>
                  <button className='modal-btn ms-1'><Link to={'/store'}>Find Program</Link></button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      )}
    </>
  );
}