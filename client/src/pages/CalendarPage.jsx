import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Header from '../components/Header/index';
import HomeMenu from '../components/HomeMenu';
import { useQuery } from '@apollo/client';
import { useUserContext } from "../utils/UserContext";
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import HomeExerciseCard from '../components/HomePageUI/HomeExerciseCard';
import { QUERY_WORKOUTS_BY_USER } from '../utils/queries';
import Auth from '../utils/auth';

export default function CalendarPage() {
  const [showMenu, setShowMenu] = useState(false);
  const [date, setDate] = useState('');
  const [show, setShow] = useState(false);
  const [workoutsOfDate, setWorkoutsOfDate] = useState([])
  const [dates, setDates] = useState([])

  const handleClose = () => setShow(false);

  const { loading: loadingFirst, data: dataFirst } = useQuery(QUERY_WORKOUTS_BY_USER, {
    variables: { userId: Auth.getProfile().data._id },
  });

  useEffect(() => {
    const workoutDates = dataFirst?.getWorkoutsByUserId.map((workout) => workout.dateCompleted)
    setDates(workoutDates)
  }, [dataFirst])

  // Function to handle date change
  const onChange = (newDate) => {
    const chosenDate = Auth.getDate(newDate);
    setDate(chosenDate);

    const filteredWorkouts = dataFirst?.getWorkoutsByUserId.filter((workout) => workout.dateCompleted === chosenDate);
    setWorkoutsOfDate(filteredWorkouts)
    setShow(true)
  }

  // Function to determine the CSS class for a specific date
  const getTileClassName = ({ date }) => {
    const dateString = date.toISOString().split('T')[0];
    return workoutsOfDate.includes(dateString) ? 'highlighted-tile' : null;
  };

  return (
    <>
      <Header showMenu={showMenu} setShowMenu={setShowMenu} />
      {showMenu ? (
        <HomeMenu />
      ) : (
        <>
          <div className='cal-page bg-dark border  '>
            <div className='cal'>
              {/* <Calendar onChange={onChange} value = {date}/> */}
              <Calendar onChange={onChange} value={date} tileClassName={getTileClassName} className="custom-calendar bg-black text-light " />
            </div>
            <div className='streaks'>
              <h3 className='streaks  bg-black text-warning rounded p-3 border'>Longest Streak:</h3>
              <h3 className='streaks bg-black text-primary rounded p-3 border'>Current Streak:</h3>
              <h3 className='streaks  bg-black text-success rounded p-3 border'>Total Days This Month:</h3>
              <h3 className='streaks bg-black text-info rounded p-3 border'>Total Days This Year:</h3>
            </div>
          </div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{date}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {workoutsOfDate.length > 0 ? (
                workoutsOfDate.map((workout, index) => (
                  <div className='border-blue p-3' key={index}>
                    <p>{workout.name}</p>
                    {workout.workout.map((lift, liftIndex) => (
                      <HomeExerciseCard key={liftIndex} exercises={lift} />
                    ))}
                  </div>
                ))
              ) : (
                <p>No workouts for this date</p>
              )}
            </Modal.Body>
          </Modal>
        </>
      )}
    </>
  )
}
