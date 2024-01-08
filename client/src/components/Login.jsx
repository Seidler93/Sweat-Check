import { useState, useEffect  } from 'react';
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

export default function Login({ setCreatingAccount }) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { loginError, loginData }] = useMutation(LOGIN_USER);
  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log({...formState});
    try {
      const { data } = await login({
        variables: { ...formState },
      });
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  const handleCreateAccountPage = () => {
    setCreatingAccount(true)
  }

  return (
    <div className='background-img flex-column vh-100 d-flex justify-content-center align-items-center'>
      {/* <img src={Logo} alt="" className='logo-login'/> */}
      <form onSubmit={handleFormSubmit} className='d-flex flex-column px-4 z5 vw-100'>
        <input
          className="mb-2 p-3 login-input"
          placeholder="Your email"
          name="email"
          type="email"
          value={formState.email}
          onChange={handleChange}
        />
        <input
          className="mb-2 p-3 login-input"
          placeholder="******"
          name="password"
          type="password"
          value={formState.password}
          onChange={handleChange}
        />
        <button
          className="btn btn-block btn-primary"
          style={{ cursor: 'pointer' }}
          type="submit"
        >
          Login
        </button>
      <p className='text-white my-5 text-center'>or</p>
      <button onClick={() => handleCreateAccountPage()} className='btn btn-block btn-primary'>Create Account</button>
      </form>
    </div>
  );
};