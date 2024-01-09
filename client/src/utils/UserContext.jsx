import { logMissingFieldErrors } from '@apollo/client/core/ObservableQuery';
import { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext)

const UserProvider = (props) => {
  const [checkedIn, setCheckedIn] = useState(false)
  const [currentWorkout, setCurrentWorkout] = useState({})

  // Example function to update the user context
  // const updateUser = async (newUser) => {
  //   console.log(newUser);    
  //   await setCurrentUser(newUser);
  // };

  return (
    <UserContext.Provider value={{ checkedIn, setCheckedIn, currentWorkout, setCurrentWorkout }} {...props} />
  );
};

export default UserProvider;
