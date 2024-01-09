import { useState, useEffect  } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';

export default function SetsRepsInput({setIndex, handleSetComplete, completedSets, setInfo, setCheckCompleted, handleSetChange }) {
  const [repsInput, setRepsInput] = useState(setInfo.reps || 0);
  const [weightInput, setWeightInput] = useState(setInfo.weight || 0);
  const [completedSet, setCompletedSet] = useState(setInfo.completed || false)

  useEffect(() => {
    if (completedSet) {
      setCheckCompleted(setIndex)
    }

    if (completedSets.includes(setIndex)) {
      setCompletedSet(true)
    }

  }, [])

  const handleRepsChange = (value) => {
    setRepsInput(value);
    handleSetChange(setIndex, value, weightInput, completedSet);
  };
  
  const handleWeightChange = (value) => {
    setWeightInput(value);
    handleSetChange(setIndex, repsInput, value, completedSet);
  };
  
  const handleCompleteChange = () => {
    const newCompletedSet = !completedSet;
    setCompletedSet(newCompletedSet);
    handleSetChange(setIndex, repsInput, weightInput, newCompletedSet);
  };
  
  return (
    <>
      <div key={setIndex} className='d-flex align-items-center justify-content-start mb-2'>
        <p className='text-white p-2 m-0 w20 text-center'>{setIndex + 1}</p>
        <input 
          className='w30 px-2 me-1 form-control' 
          type="number" 
          placeholder='reps' 
          value={repsInput}
          onChange={(e) => handleRepsChange(parseInt(e.target.value, 10))}
        />
        <input 
          className='w30 px-2 ms-1 form-control' 
          type="number" 
          placeholder='weight' 
          value={weightInput}
          onChange={(e) => handleWeightChange(parseInt(e.target.value, 10))}
        />
        <button
          onClick={() => handleCompleteChange()}
          className={"set-checkmark-btn "}
        >
          <FontAwesomeIcon
            icon={faSquareCheck}
            className={`set-checkmark ${completedSet ? 'completed-set' : ''}`}
          />
        </button>
      </div>
    </>
  );
};