import { Link } from 'react-router-dom';

export default function Friends() {
  
  return (
    <>
      <h2 className='ms-3'>Friends</h2> 
      <div className='d-flex flex-column'>
        <button className='friend-btn'><Link to={'/store/friendId'}>First Last</Link><p>Status</p></button>
        <button className='friend-btn'><Link to={'/store/friendId'}>First Last</Link><p>Status</p></button>
        <button className='friend-btn'><Link to={'/store/friendId'}>First Last</Link><p>Status</p></button>
        <button className='friend-btn'><Link to={'/store/friendId'}>First Last</Link><p>Status</p></button>
        <button className='friend-btn'><Link to={'/store/friendId'}>First Last</Link><p>Status</p></button>              
        <button className='friend-btn'><Link to={'/store/friendId'}>First Last</Link><p>Status</p></button>              
        <button className='friend-btn'><Link to={'/store/friendId'}>First Last</Link><p>Status</p></button>              
        <button className='friend-btn'><Link to={'/store/friendId'}>First Last</Link><p>Status</p></button>              
        <button className='friend-btn'><Link to={'/store/friendId'}>First Last</Link><p>Status</p></button>              
        <button className='friend-btn'><Link to={'/store/friendId'}>First Last</Link><p>Status</p></button>              
      </div>
    </>
  );
};