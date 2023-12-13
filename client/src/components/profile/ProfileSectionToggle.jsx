import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faToiletPortable, faChartSimple, faUserGroup } from "@fortawesome/free-solid-svg-icons"

export default function ProfileSectionToggle ({ activeSection, setProfileSection, profileSections }) {
  return (
    <div className="toggle-container px-4 pb-2">
      <button
        className={`profile-toggle-btn ${activeSection === profileSections[0] ? 'profile-toggle-active' : ''}`}
        onClick={() => setProfileSection(profileSections[0])}
      >
        <FontAwesomeIcon icon={faToiletPortable} />
      </button>
      <button
        className={`profile-toggle-btn ${activeSection === profileSections[1] ? 'profile-toggle-active' : ''}`}
        onClick={() => setProfileSection(profileSections[1])}
      >
        <FontAwesomeIcon icon={faChartSimple} />
      </button>
      <button
        className={`profile-toggle-btn ${activeSection === profileSections[2] ? 'profile-toggle-active' : ''}`}
        onClick={() => setProfileSection(profileSections[2])}
      >
        <FontAwesomeIcon icon={faUserGroup} />
      </button>
    </div>
  );
}