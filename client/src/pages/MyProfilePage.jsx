import { useState } from 'react';
import Header from '../components/Header/index';
import HomeMenu from '../components/HomeMenu';
import { useQuery } from '@apollo/client';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileSectionToggle from '../components/profile/ProfileSectionToggle';
import MyPosts from '../components/profile/MyPosts';
import MyProgress from '../components/profile/MyProgress';
import MyFriends from '../components/profile/MyFriends';

export default function MyProfilePage(){
  const [showMenu, setShowMenu] = useState(false);
  const profileSections = ['feed', 'progress', 'friends']
  const [profileSection, setProfileSection] = useState('feed');
  
  return (
      <>
      <Header showMenu={showMenu} setShowMenu={setShowMenu} />
    {showMenu ? (
      <HomeMenu />
    ) : (
      <>
        <div className='psomething'>
          <ProfileHeader/>
          <ProfileSectionToggle setProfileSection={setProfileSection} profileSections={profileSections} activeSection={profileSection}/>
          {profileSection === profileSections[0] ? <MyPosts/> : profileSection === profileSections[1] ? <MyProgress/> : profileSection === profileSections[2] ? <MyFriends/> : ''}
        </div>
      </>
    )}
    </>
  )
}


