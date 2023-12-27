import { useState, useEffect  } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';

export default function SetsRepsInput({setIndex, handleSetComplete, completedSets }) {
  const [repsInput, setRepsInput] = useState('');
  const [weightInput, setWeightInput] = useState('');

  return (
    <>
      <div key={setIndex} className='d-flex align-items-center justify-content-start mb-2'>
        <p className='text-white p-2 m-0 w20 text-center'>{setIndex + 1}</p>
        <input 
          className='w30 px-2 me-1 form-control' 
          type="text" 
          placeholder='reps' 
          value={repsInput}
          onChange={(e) => setRepsInput(e.target.value)}
          />
        <input 
          className='w30 px-2 ms-1 form-control' 
          type="text" 
          placeholder='weight' 
          value={weightInput}
          onChange={(e) => setWeightInput(e.target.value)}
          />
        <button
          onClick={() => handleSetComplete(setIndex, repsInput, weightInput)}
          className={"set-checkmark-btn "}
        >
          <FontAwesomeIcon
            icon={faSquareCheck}
            className={`set-checkmark ${completedSets.includes(setIndex) ? 'completed-set' : ''}`}
          />
        </button>
      </div>
    </>
  );
};