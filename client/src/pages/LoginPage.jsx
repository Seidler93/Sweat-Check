import { useState, useEffect } from 'react';
import Login from '../components/Login';
import Signup from '../components/Signup';

export default function LoginPage() {
  const [creatingAccount, setCreatingAccount] = useState(false)  

  return (
    <>
      {!creatingAccount ? <Login setCreatingAccount={setCreatingAccount}/> : <Signup setCreatingAccount={setCreatingAccount}/>}
    </>
  );
};