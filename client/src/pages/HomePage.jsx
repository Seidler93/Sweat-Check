import Header from '../components/Header/index'
import HomeMenu from '../components/HomeMenu';
import { useState, useEffect  } from 'react';
import { Link, useParams } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { useUserContext } from "../utils/UserContext";
import Programs from '../components/HomePageUI/Programs';
import Friends from '../components/HomePageUI/Friends';
import { useQuery } from '@apollo/client';
import { QUERY_WORKOUTS_BY_USER } from '../utils/queries';
import Auth from '../utils/auth';
import { Icon } from '@iconify/react';

export default function WorkoutPage() {
  const [showMenu, setShowMenu] = useState(false);
  const [show, setShow] = useState(false);
  const [showWP, setShowWP] = useState(true);
  const [templateWorkouts, setTemplateWorkouts] = useState([])

  const {checkedIn, setCheckedIn, currentWorkout, setCurrentWorkout} = useUserContext()

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleWP = () => setShowWP(true);
  const hanldeFriends = () => setShowWP(false);

  const profile = Auth.getProfile().data
  // console.log(profile._id);

  const { loading: loadingFirst, data: dataFirst } = useQuery(QUERY_WORKOUTS_BY_USER, {
    variables: { userId: Auth.getProfile().data._id },
  });

  useEffect(() => {
    const storedWorkout = JSON.parse(localStorage.getItem('currentWorkout')) || false;

    if (storedWorkout) {
      setCheckedIn(true);
      setCurrentWorkout(storedWorkout)
    }

    // Log the dataFirst variable
    console.log('Data First:', dataFirst);

    // Filter workouts where the key "template" is true
    if (dataFirst?.getWorkoutsByUserId) {
      const storedTemplateWorkouts = dataFirst?.getWorkoutsByUserId.filter(workout => workout.template === true) || false;
      storedTemplateWorkouts ? setTemplateWorkouts(storedTemplateWorkouts) : []
    }
    // Refresh the current page
    //console.log('Template Workouts:', storedTemplateWorkouts);
  }, [dataFirst, checkedIn])

  return (
    <div className='hp d-flex flex-column'>
      {/* when you click the workout button, it will as you if you want to continue to your current program */}
      <button variant="primary" onClick={handleShow} className='workout-btn text-white'>Workout</button>
      <div className='home-programs p-3'>
        <button className={`bg-tr none mx-2 p-0 ${showWP ? 'profile-toggle-active' : ''}`} onClick={handleWP}><h2 className=''>Workouts/Programs</h2></button>
        <button className={`bg-tr none mx-2 p-0 ${!showWP ? 'profile-toggle-active' : ''}`} onClick={hanldeFriends}><h2 className=''>Friends</h2></button>
      </div>
      {showWP ? (
        <Programs workouts={templateWorkouts} loading={loadingFirst} />
      ) : (
        <Friends/>
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select Workout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <h2 className='ms-3 text-dark'>Current Program</h2> */}
          {/* <button className='current-program-btn'><Link to={'/store/programId'}>Program 1</Link></button> */}
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