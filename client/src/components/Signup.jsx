import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

export default function Signup({ setCreatingAccount }) {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  const handleLoginPage = () => {
    setCreatingAccount(false)
  }

  return (
    <div className='background-img flex-column vh-100 d-flex justify-content-center align-items-center'>
      <form onSubmit={handleFormSubmit} className='d-flex flex-column px-4 z5 vw-100'>
        <input
          className="mb-2 p-3"
          placeholder="First Name"
          name="firstName"
          type="text"
          value={formState.firstName}
          onChange={handleChange}
        />
        <input
          className="mb-2 p-3"
          placeholder="Last Name"
          name="lastName"
          type="text"
          value={formState.lastName}
          onChange={handleChange}
        />
        <input
          className="mb-2 p-3"
          placeholder="Your username"
          name="username"
          type="text"
          value={formState.name}
          onChange={handleChange}
        />
        <input
          className="mb-2 p-3"
          placeholder="Your email"
          name="email"
          type="email"
          value={formState.email}
          onChange={handleChange}
        />
        <input
          className="mb-2 p-3"
          placeholder="******"
          name="password"
          type="password"
          value={formState.password}
          onChange={handleChange}
        />
        <button
          className="btn btn-block btn-primary mb-2"
          style={{ cursor: 'pointer' }}
          type="submit"
        >
          Submit
        </button>
        <button onClick={() => handleLoginPage()} className='btn btn-block btn-primary my-5'>Login</button>
      </form>
    </div>
  );
};
