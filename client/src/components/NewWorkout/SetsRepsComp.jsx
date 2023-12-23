import { useState, useEffect  } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck, faPlus, faCaretDown } from '@fortawesome/free-solid-svg-icons';

export default function SetsRepsComp({setCount}) {
  const [completedSets, setCompletedSets] = useState([]);
  const [allSetsCompleted, setAllSetsCompleted] = useState(false);

  useEffect(() => {
    if (completedSets.length === setCount) {
      setAllSetsCompleted(true);
    } else if (completedSets.length !== setCount) {
      setAllSetsCompleted(false);
    }
  }, [completedSets, setCount]);

  const handleSetComplete = async (setIndex) => {
    setCompletedSets((prevCompletedSets) => {
      if (prevCompletedSets.includes(setIndex)) {
        return prevCompletedSets.filter((index) => index !== setIndex);
      } else {
        return [...prevCompletedSets, setIndex];
      }
    });
  };

  return (
    <>
      <div className='text-white d-flex align-items-center justify-content-start'>
        <h4 className='w20 text-center'>Sets</h4>
        <h4 className='w30 text-center me-1'>Reps</h4>
        <h4 className='w30 text-center ms-1'>Weight</h4>
        <p className={"set-checkmark-btn pbmatch m-0"}>
          <FontAwesomeIcon
            icon={faSquareCheck}
            className={`set-checkmark ${allSetsCompleted ? 'completed-set' : ''}`}
          />
        </p>
      </div>
      {Array.from({ length: setCount }, (_, setIndex) => (
        <div key={setIndex} className='d-flex align-items-center justify-content-start mb-2'>
          <p className='text-white p-2 m-0 w20 text-center'>{setIndex + 1}</p>
          <input className='w30 px-2 me-1 form-control' type="text" placeholder='reps' />
          <input className='w30 px-2 ms-1 form-control' type="text" placeholder='weight' />
          <button
            onClick={() => handleSetComplete(setIndex)}
            className={"set-checkmark-btn "}
          >
            <FontAwesomeIcon
              icon={faSquareCheck}
              className={`set-checkmark ${completedSets.includes(setIndex) ? 'completed-set' : ''}`}
            />
          </button>
        </div>
      ))}
    </>
  );
};