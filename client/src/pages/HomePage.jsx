import { useState, useEffect  } from 'react';
import { Link, useParams } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { useUserContext } from "../utils/UserContext";
import Programs from '../components/HomePageUI/Programs';
import Friends from '../components/HomePageUI/Friends';
import { useQuery } from '@apollo/client';
import { QUERY_HOMEPAGE_USER } from '../utils/queries';
import Auth from '../utils/auth';
import { Icon } from '@iconify/react';

export default function WorkoutPage() {
  const [show, setShow] = useState(false);
  const [showWP, setShowWP] = useState(true);
  const [templateWorkouts, setTemplateWorkouts] = useState([])
  const {checkedIn, setCheckedIn, currentWorkout, setCurrentWorkout, user, setUser} = useUserContext()

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleWP = () => setShowWP(true);
  const hanldeFriends = () => setShowWP(false);

  const { loading: loadingUser, data: userData } = useQuery(QUERY_HOMEPAGE_USER, {
    variables: { id: Auth.getProfile().data._id },
  });

  useEffect(() => {
    const storedWorkout = JSON.parse(localStorage.getItem('currentWorkout')) || false;

    if (storedWorkout) {
      setCheckedIn(true);
      setCurrentWorkout(storedWorkout)
    }
    
    if (userData?.homePage) {
      setUser(userData.homePage)
    }
    
    // Log the userData variable
    console.log('User Data:', userData);

  }, [userData, checkedIn])

  return (
    <div className='hp d-flex flex-column'>
      {/* when you click the workout button, it will ask you if you want to continue to your current program */}
      <button variant="primary" onClick={handleShow} className='workout-btn text-white'>Workout</button>
      <div className='home-programs p-3'>
        <button className={`bg-tr none mx-2 p-0 ${showWP ? 'profile-toggle-active' : ''}`} onClick={handleWP}><h2 className=''>Workouts/Programs</h2></button>
        <button className={`bg-tr none mx-2 p-0 ${!showWP ? 'profile-toggle-active' : ''}`} onClick={hanldeFriends}><h2 className=''>Friends</h2></button>
      </div>
      {showWP ? (
        <Programs loading={loadingUser} />
      ) : (
        <Friends loading={loadingUser}/>
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select Workout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='d-flex flex-column'>
            <button className='modal-btn'><Link to={'/newWorkoutPage'}><FontAwesomeIcon className='pe-3' icon={faPlus} />New Workout</Link></button>
            {checkedIn && currentWorkout && <button className='modal-btn'><Link to={'/workout/woip'}>Resume Workout</Link></button>}
            <div className='d-flex'>
              <button className='modal-btn me-1'><Link to={'/store'}>Find Workout</Link></button>
              <button className='modal-btn ms-1'><Link to={'/store'}>Find Program</Link></button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}