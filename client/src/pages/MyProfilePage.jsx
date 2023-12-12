import { useState } from 'react';
import Header from '../components/Header/index';
import HomeMenu from '../components/HomeMenu';
import { useQuery } from '@apollo/client';

export default function MyProfilePage(){
    const [showMenu, setShowMenu] = useState(false);
    
    return (
        <>
        <Header showMenu={showMenu} setShowMenu={setShowMenu} />
      {showMenu ? (
        <HomeMenu />
      ) : (
        <>
        <div className='psomething'>
            my profile
         </div>
        </>
      )}
      </>
    )
}


