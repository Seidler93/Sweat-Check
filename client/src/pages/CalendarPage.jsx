import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Header from '../components/Header/index';
import HomeMenu from '../components/HomeMenu';
import { useQuery } from '@apollo/client';

export default function CalendarPage(){
    const [showMenu, setShowMenu] = useState(false);
    const [date,setDate] = useState(new Date());
    const onChange = (selectedDate) => {
        setDate(selectedDate);
      };
    return (
        <>
        <Header showMenu={showMenu} setShowMenu={setShowMenu} />
      {showMenu ? (
        <HomeMenu />
      ) : (
        <>
        <div className='psomething'>
            <Calendar onChange={onChange} value = {date}/>
         </div>
        </>
      )}
      </>
    )
}


