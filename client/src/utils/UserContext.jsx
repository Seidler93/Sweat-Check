import { logMissingFieldErrors } from '@apollo/client/core/ObservableQuery';
import { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext)

const UserProvider = (props) => {
  const [checkedIn, setCheckedIn] = useState(false)
  const [currentWorkout, setCurrentWorkout] = useState({})
  const [user, setUser] = useState({})
  
  return (
    <UserContext.Provider value={{ checkedIn, setCheckedIn, currentWorkout, setCurrentWorkout, user, setUser }} {...props} />
  );
};

export default UserProvider;
