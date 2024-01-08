import { Link } from 'react-router-dom';

export default function Programs() {
  
  return (
    <>
      <h2 className='ms-3 mt-1'>My Workouts</h2>
      <div className='home-programs'>
        <button className='program-btn'><Link to={'/store/programId'}>Program 1</Link></button>
        <button className='program-btn'><Link to={'/store/programId'}>Program 2</Link></button>
        <button className='program-btn'><Link to={'/store/programId'}>Program 3</Link></button>
        <button className='program-btn'><Link to={'/store/programId'}>Program 4</Link></button>
        <button className='program-btn'><Link to={'/store/programId'}>Find more...</Link></button>              
      </div>
      <h2 className='ms-3 mt-4'>My Programs</h2>
      <div className='home-programs'>
        <button className='program-btn'><Link to={'/store/programId'}>Program 1</Link></button>
        <button className='program-btn'><Link to={'/store/programId'}>Program 2</Link></button>
        <button className='program-btn'><Link to={'/store/programId'}>Program 3</Link></button>
        <button className='program-btn'><Link to={'/store/programId'}>Program 4</Link></button>
        <button className='program-btn'><Link to={'/store/programId'}>Find more...</Link></button>              
      </div>
      {/* query to db to find everything that is for sale here */}
      <h2 className='ms-3 mt-4'>Featured Workouts</h2>
      <div className='home-programs'>
        <button className='program-btn'><Link to={'/store/programId'}>Program 1</Link></button>
        <button className='program-btn'><Link to={'/store/programId'}>Program 2</Link></button>
        <button className='program-btn'><Link to={'/store/programId'}>Program 3</Link></button>
        <button className='program-btn'><Link to={'/store/programId'}>Program 4</Link></button>
        <button className='program-btn'><Link to={'/store/programId'}>Find more...</Link></button>              
      </div> 
      <h2 className='ms-3 mt-4'>Featured Programs</h2> 
      <div className='home-programs'>
        <button className='program-btn'><Link to={'/store/programId'}>Program 1</Link></button>
        <button className='program-btn'><Link to={'/store/programId'}>Program 2</Link></button>
        <button className='program-btn'><Link to={'/store/programId'}>Program 3</Link></button>
        <button className='program-btn'><Link to={'/store/programId'}>Program 4</Link></button>
        <button className='program-btn'><Link to={'/store/programId'}>Find more...</Link></button>              
      </div> 
      <button className='see-all-btn mt-4'><Link to={'/store'}>See All</Link></button> 
    </>
  );
};