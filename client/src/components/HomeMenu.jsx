import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLockBodyScroll } from "@uidotdev/usehooks";

export default function Homemenu ({showMenu, setShowMenu}) {
  const links = [
    {to: '/', name: 'Home'},
    {to: 'myWorkouts/me', name: 'My Workouts'},
    {to: 'myPrograms', name: 'My Programs'},
    {to: '/profile/me', name: 'My Profile'},
    {to: '/myStats', name: 'Stats'},
    {to: '/calendar', name: 'Calendar'},
    {to: '/settings', name: 'Settings'},
    {to: '/exercise', name: 'Exercises'},
  ]

  function PreventBg({handleClose}) {
    useLockBodyScroll();

    return (
      <motion.div 
        onClick={handleClose} 
        className='menu-bg bg-dark'
        initial={{opacity: 0}}
        animate={{ opacity: .5 }}
        transition={{ duration: 0.3 }} 
      >
        &zwnj;
      </motion.div>
    )
  }

  return (
    <>
      <motion.div 
        className="d-flex flex-column z5" 
        id='homeMenu'
        initial={{x: 150}}
        animate={{ x: showMenu ? 0 : 350 }}
        transition={{ duration: 0.3 }} 
      >
        {links.map((link, index) => <Link key={index} to={link.to} className="menu-option" onClick={() => setShowMenu(false)}>{link.name}</Link>)}
      </motion.div>  
      {showMenu && <PreventBg handleClose={() => setShowMenu(false)}/>}
    </>
  );
};



