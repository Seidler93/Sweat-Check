import { logMissingFieldErrors } from '@apollo/client/core/ObservableQuery';
import { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext)

const UserProvider = (props) => {
  const [checkedIn, setCheckedIn] = useState(false)
  const [currentWorkout, setCurrentWorkout] = useState({})
  
  return (
    <UserContext.Provider value={{ checkedIn, setCheckedIn, currentWorkout, setCurrentWorkout }} {...props} />
  );
};

export default UserProvider;
