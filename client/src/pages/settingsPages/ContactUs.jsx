import React from 'react';

const ContactUs = () => {
  const teamMembers = [
    { name: 'John Doe', email: 'john.doe@example.com' },
    { name: 'Jane Smith', email: 'jane.smith@example.com' },
    // Add more team members as needed
  ];

  return (
    <div>
      <h1>Contact Us</h1>
      <ul>
        {teamMembers.map((member, index) => (
          <li key={index}>
            <strong>{member.name}</strong> - {member.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactUs;