import PlaceholderPortrait from '../../assets/placeholderPortrait.jpg'

export default function ProfileHeader () {
  return (
    <div className='profile-container'>
      <div>
        <h1>User Name</h1>
        <p>Bio</p>
      </div>
      <img className='profile-portrait' src={PlaceholderPortrait} alt="" />
    </div>
  );
}