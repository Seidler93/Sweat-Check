import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Header from '../components/Header/index';
import HomeMenu from '../components/HomeMenu';
import { useQuery } from '@apollo/client';
import { useUserContext } from "../utils/UserContext";

export default function CalendarPage(){
  const [showMenu, setShowMenu] = useState(false);
  const [date,setDate] = useState(new Date());
  
  let datesWorkedOut = [ '2023-12-25','2023-12-24','2023-12-23',]
  const dateCheckedIn = JSON.parse(localStorage.getItem('checkedIn')) || '';

  datesWorkedOut = [...datesWorkedOut, dateCheckedIn]
  const {checkedIn, setCheckedIn} = useUserContext()

  // Function to handle date change
  const onChange = (newDate) => {
    setDate(newDate);
  }

  // Function to determine the CSS class for a specific date
  const getTileClassName = ({ date }) => {
    const dateString = date.toISOString().split('T')[0];
    return datesWorkedOut.includes(dateString) ? 'highlighted-tile' : null;
  };

  useEffect(() => {
    const dateCheckedIn = JSON.parse(localStorage.getItem('checkedIn')) || '';
    datesWorkedOut = [...datesWorkedOut, dateCheckedIn]
  }, [checkedIn])

  function countConsecutiveDates(dateArray) {
    if (dateArray.length === 0) {
      return 0; // Empty array has no consecutive dates
    }
    console.log(dateArray);
    let count = 1;
    let currentDate = new Date(dateArray[0]);
  
    for (let i = 1; i < dateArray.length; i++) {
      const nextDate = new Date(dateArray[i]);
      const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
  
      if (nextDate - currentDate === oneDay) {
        count++;
        currentDate = nextDate;
      } else {
        break; // Break the sequence if the next date is not one day ahead
      }
    }
    console.log(count);
    return count;
  }

  let longestStreak = 0;
  let currentStreak = 0;

  const calculateWorkoutStreak = (dates) => {
    if (dates.length === 0) {
      return 0; // No workouts, so streak is 0
    }
  
    // Sort the dates in descending order (newest to oldest)
    const sortedDates = dates.sort((a, b) => new Date(b) - new Date(a));
    // console.log(sortedDates);
  
    let currentStreak = 0;
  
    
    // Check if the current date is consecutive with yesterday's date
    const lastCheckedIn = (sortedDates[0]);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const year = yesterday.getFullYear();
    const month = yesterday.getMonth() + 1; // Months are zero-indexed, so add 1
    const day = yesterday.getDate();
    
    // Format the date as a string
    const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

    // console.log('last checked in date:',lastCheckedIn);
    // console.log('yesterday:',formattedDate);

    if (lastCheckedIn === formattedDate) {
      // Consecutive days
      currentStreak = countConsecutiveDates(sortedDates);
    }
  
    return currentStreak;
  };


  const streak = calculateWorkoutStreak(datesWorkedOut);



    return (
        <>
        <Header showMenu={showMenu} setShowMenu={setShowMenu} />
      {showMenu ? (
        <HomeMenu />
      ) : (
        <>
        <div className='CalPage bg-dark border  '>
          <div className='Cal'>
            {/* <Calendar onChange={onChange} value = {date}/> */}
            <Calendar onChange={onChange} value={date} tileClassName={getTileClassName} className="custom-calendar bg-black text-light " />
            </div>
         <div className='streaks'>
          <h3 className='Streaks  bg-black text-warning rounded p-3 border'>Longest Streak:</h3>
          <h3 className='Streaks bg-black text-primary rounded p-3 border'>Current Streak:</h3>
          <h3 className='Streaks  bg-black text-success rounded p-3 border'>Total Days This Month:</h3>
          <h3 className='Streaks bg-black text-info rounded p-3 border'>Total Days This Year:</h3>
         </div>
         </div>
        </>
      )}
      </>
    )
}


