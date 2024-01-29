import React, { useState } from 'react';

const EditInfo = () => {
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    // Add other user profile fields as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to save user information (e.g., make an API call)
    console.log('User information saved:', userInfo);
  };

  return (
    <div>
      <h1>Edit Info</h1>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" name="firstName" value={userInfo.firstName} onChange={handleChange} />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" name="lastName" value={userInfo.lastName} onChange={handleChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" value={userInfo.email} onChange={handleChange} />
        </label>
        <br />
        {/* Add other user profile fields as needed */}
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditInfo;