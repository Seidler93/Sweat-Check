import React, { useState } from 'react';

const Notifications = () => {
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: false,
    sms: true,
    // Add more notification options as needed
  });

  const handleToggle = (option) => {
    setNotificationSettings((prevSettings) => ({
      ...prevSettings,
      [option]: !prevSettings[option],
    }));
  };

  return (
    <div>
      <h1>Notification Settings</h1>
      <div>
        <label>
          <input type="checkbox" checked={notificationSettings.email} onChange={() => handleToggle('email')} />
          Receive Email Notifications
        </label>
      </div>
      <div>
        <label>
          <input type="checkbox" checked={notificationSettings.push} onChange={() => handleToggle('push')} />
          Receive Push Notifications
        </label>
      </div>
      <div>
        <label>
          <input type="checkbox" checked={notificationSettings.sms} onChange={() => handleToggle('sms')} />
          Receive SMS Notifications
        </label>
      </div>
      {/* Add more notification options as needed */}
    </div>
  );
};

export default Notifications;