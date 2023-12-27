import React, { useState, useEffect} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Header from '../components/Header/index';
import HomeMenu from '../components/HomeMenu';
import { useQuery } from '@apollo/client';

export default function CalendarPage(){
    const [showMenu, setShowMenu] = useState(false);
    const [date,setDate] = useState(new Date());
    // const onChange = (selectedDate) => {
    //     setDate(selectedDate);
    //   };
      let datesWorkedOut = [ '2023-12-24','2023-12-25','2023-12-23',]
      const dateCheckedIn = JSON.parse(localStorage.getItem('checkedIn')) || '';

datesWorkedOut = [...datesWorkedOut, dateCheckedIn]
      // Function to determine the background color for a specific date
  const getTileContent = ({ date, view }) => {
    if (view === 'month') {
      const dateString = date.toISOString().split('T')[0];
      if (datesWorkedOut.includes(dateString)) {
        return <div style={{ background: 'green', padding: '2px' }} />;
      }
    }
    return null;
  };
  // Function to handle date change
  const onChange = (newDate) => {
    setDate(newDate);
  }
   // Function to determine the CSS class for a specific date
   const getTileClassName = ({ date }) => {
    const dateString = date.toISOString().split('T')[0];
    return datesWorkedOut.includes(dateString) ? 'highlighted-tile' : null;
  };
    return (
        <>
        <Header showMenu={showMenu} setShowMenu={setShowMenu} />
      {showMenu ? (
        <HomeMenu />
      ) : (
        <>
        <div className='hp'>
            {/* <Calendar onChange={onChange} value = {date}/> */}
            <Calendar onChange={onChange} value={date} tileClassName={getTileClassName} />
         </div>
        </>
      )}
      </>
    )
}


