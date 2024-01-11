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
  const [streaks, setStreaks] = useState({
    workoutsThisMonth: '', 
    workoutsThisYear: '',
    currentStreak: '',
    longestStreak: '',
  })

  function getMonth() {
    const thisDate = Auth.getDate(Date.now())
    const [month] = thisDate.split('/');
    return month
  }

  const [currentMonth, setCurrentMonth] = useState(getMonth())

  function getYear() {
    const thisDate = Auth.getDate(Date.now())
    const [month, day, year] = thisDate.split('/');
    return year
  }
  
  const [currentyear, setCurrentyear] = useState(getYear())

  const handleClose = () => setShow(false);

  const { loading: loadingFirst, data: dataFirst } = useQuery(QUERY_WORKOUTS_BY_USER, {
    variables: { userId: Auth.getProfile().data._id },
  });

  const extractMonth = (date) => {
    // Check if the provided date is a valid Date object
    if (Object.prototype.toString.call(date) === '[object Date]') {
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      return month;
    } else {
      console.error('Invalid Date object provided.');
      return null;
    }
  };

  const extractYear = (date) => {
    // Check if the provided date is a valid Date object
    if (Object.prototype.toString.call(date) === '[object Date]') {
      const year = date.getFullYear().toString();
      return year;
    } else {
      console.error('Invalid Date object provided.');
      return null;
    }
  };

  useEffect(() => {
    const workoutDates = dataFirst?.getWorkoutsByUserId.map((workout) => workout.dateCompleted);
    setDates(workoutDates);
  }, [dataFirst]);

  useEffect(() => {
    if (dates.length > 0) {
      calculateStreak(dates);
    }
  }, [dates, currentMonth, currentyear]);

  // Function to handle date change
  const onChange = (newDate) => {
    const chosenDate = Auth.getDate(newDate);
    setDate(chosenDate);

    const filteredWorkouts = dataFirst?.getWorkoutsByUserId.filter((workout) => workout.dateCompleted === chosenDate);
    setWorkoutsOfDate(filteredWorkouts)
    setShow(true)
  }

  // Function to handle month change
  const onClickNavigation = (newDate) => {
    const activeStartDate = newDate.activeStartDate
    const month = extractMonth(activeStartDate);
    const year = extractYear(activeStartDate)
    setCurrentMonth(month)
    setCurrentyear(year)
  }

  // Function to determine the CSS class for a specific date
  const getTileClassName = ({ date }) => {
    const dateString = date.toISOString().split('T')[0];
    return workoutsOfDate.includes(dateString) ? 'highlighted-tile' : null;
  };

  const calculateStreak = (dates) => {
    // Convert the array to a Set to remove duplicates
    const uniqueDatesSet = new Set(dates);

    // Convert the Set back to an array
    const uniqueDates = Array.from(uniqueDatesSet);

    let currentStreak = 0;
    let longestStreak = 0;
    let workoutsThisMonth = 0;
    let workoutsThisYear = 0;
    uniqueDates.forEach(date => {
      const [month, day, year] = date.split('/');
    
      // Check if the date is in the specified month
      if (month === currentMonth) {
        workoutsThisMonth++
      }

      // Check if the date is in the specified month
      if (year === currentyear) {
        workoutsThisYear++
      }
    })

  
    for (let i = 0; i < uniqueDates.length - 1; i++) {
      const currentDate = new Date(uniqueDates[i]);
      const nextDate = new Date(uniqueDates[i + 1]);
  
      // Calculate the difference in days between two consecutive dates
      const timeDifference = (nextDate - currentDate) / (1000 * 3600 * 24);
  
      if (timeDifference === 1) {
        // Dates are consecutive, increment current streak
        currentStreak++;
      } else {
        // Dates are not consecutive, update streaks if necessary
        longestStreak = Math.max(longestStreak, currentStreak);
        currentStreak = 0;
      }
    }

    if (Auth.getDate(Date.now()) === uniqueDates[uniqueDates.length - 1]) {
      currentStreak++;
    }    
  
    // Update streaks based on the last iteration
    longestStreak = Math.max(longestStreak, currentStreak);

    setStreaks({
      workoutsThisMonth: workoutsThisMonth, 
      workoutsThisYear: workoutsThisYear,
      currentStreak: currentStreak,
      longestStreak: longestStreak,
    })
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
              <Calendar onActiveStartDateChange={onClickNavigation} onChange={onChange} value={date} tileClassName={getTileClassName} className="custom-calendar bg-black text-light " />
            </div>
            <div className='streaks'>
              <h3 className='streaks  bg-black text-warning rounded p-3 border'>Longest Streak: {streaks.longestStreak}</h3>
              <h3 className='streaks bg-black text-primary rounded p-3 border'>Current Streak: {streaks.currentStreak}</h3>
              <h3 className='streaks  bg-black text-success rounded p-3 border'>Total Days This Month: {streaks.workoutsThisMonth}</h3>
              <h3 className='streaks bg-black text-info rounded p-3 border'>Total Days This Year: {streaks.workoutsThisYear}</h3>
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
