import Header from '../components/Header/index'
import HomeMenu from '../components/HomeMenu';
import { useState, useEffect  } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { useUserContext } from "../utils/UserContext";

export default function WorkoutPage() {
  const [showMenu, setShowMenu] = useState(false);
  const [show, setShow] = useState(false);
  const [woip, setWoip] = useState([]);

  const {checkedIn, setCheckedIn} = useUserContext()

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const storedWorkout = JSON.parse(localStorage.getItem('woip'));
    if (storedWorkout) {
      setWoip(storedWorkout);
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
        
            <h2 className='ms-3'>My Programs</h2>
            <div className='home-programs'>
              <button className='program-btn'><Link to={'/store/programId'}>Program 1</Link></button>
              <button className='program-btn'><Link to={'/store/programId'}>Program 2</Link></button>
              <button className='program-btn'><Link to={'/store/programId'}>Program 3</Link></button>
              <button className='program-btn'><Link to={'/store/programId'}>Program 4</Link></button>
              <button className='program-btn'><Link to={'/store/programId'}>Find more...</Link></button>              
            </div>
          {/* query to db to find everything that is for sale here */}
            <h2 className='ms-3'>Featured Workouts</h2>
            <div className='home-programs'>
              <button className='program-btn'><Link to={'/store/programId'}>Program 1</Link></button>
              <button className='program-btn'><Link to={'/store/programId'}>Program 2</Link></button>
              <button className='program-btn'><Link to={'/store/programId'}>Program 3</Link></button>
              <button className='program-btn'><Link to={'/store/programId'}>Program 4</Link></button>
              <button className='program-btn'><Link to={'/store/programId'}>Find more...</Link></button>              
            </div> 
            <h2 className='ms-3'>Featured Programs</h2> 
            <div className='home-programs'>
              <button className='program-btn'><Link to={'/store/programId'}>Program 1</Link></button>
              <button className='program-btn'><Link to={'/store/programId'}>Program 2</Link></button>
              <button className='program-btn'><Link to={'/store/programId'}>Program 3</Link></button>
              <button className='program-btn'><Link to={'/store/programId'}>Program 4</Link></button>
              <button className='program-btn'><Link to={'/store/programId'}>Find more...</Link></button>              
            </div> 
          <button className='see-all-btn'><Link to={'/store'}>See All</Link></button>

            <h2 className='ms-3'>Friends</h2> 
            <div className='d-flex flex-column friends-container'>
              <button className='friend-btn'><Link to={'/store/friendId'}>First Last</Link><p>Status</p></button>
              <button className='friend-btn'><Link to={'/store/friendId'}>First Last</Link><p>Status</p></button>
              <button className='friend-btn'><Link to={'/store/friendId'}>First Last</Link><p>Status</p></button>
              <button className='friend-btn'><Link to={'/store/friendId'}>First Last</Link><p>Status</p></button>
              <button className='friend-btn'><Link to={'/store/friendId'}>First Last</Link><p>Status</p></button>              
              <button className='friend-btn'><Link to={'/store/friendId'}>First Last</Link><p>Status</p></button>              
              <button className='friend-btn'><Link to={'/store/friendId'}>First Last</Link><p>Status</p></button>              
              <button className='friend-btn'><Link to={'/store/friendId'}>First Last</Link><p>Status</p></button>              
              <button className='friend-btn'><Link to={'/store/friendId'}>First Last</Link><p>Status</p></button>              
              <button className='friend-btn'><Link to={'/store/friendId'}>First Last</Link><p>Status</p></button>              
            </div> 
        </div>
      )}
    </>
  );
}