import { useState, useEffect  } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck, faPlus, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import SetsRepsInput from './SetsRepsInput';

export default function SetsRepsComp({setCount, completeSet, exerciseIndex, setsInfo, updateSet}) {
  const [completedSets, setCompletedSets] = useState([]);
  const [allSetsCompleted, setAllSetsCompleted] = useState(false);
  // //console.log('setsInfo:', setsInfo);

  const getTotalCompletedSets = (sets) => {
    return sets.reduce((totalCompletedSets, set) => {
      return totalCompletedSets + (set.completed ? 1 : 0);
    }, 0);
  };

  useEffect(() => {
    if (getTotalCompletedSets(setsInfo) === setsInfo.length) {
      setAllSetsCompleted(true);
    } else if (completedSets.length !== setsInfo.length) {
      setAllSetsCompleted(false);
    }
  }, [completedSets, setCount]);

  const handleSetComplete = async (setIndex, repsInput, weightInput, completedInput) => {
    setCompletedSets((prevCompletedSets) => {
      if (prevCompletedSets.includes(setIndex)) {
        return prevCompletedSets.filter((index) => index !== setIndex);
      } else {
        return [...prevCompletedSets, setIndex];
      }
    });
    completeSet(setIndex, repsInput, weightInput, exerciseIndex, completedInput)
  };

  const handleSetChange = async (setIndex, repsInput, weightInput, completedInput) => {
    setCompletedSets((prevCompletedSets) => {
      if (prevCompletedSets.includes(setIndex)) {
        return prevCompletedSets.filter((index) => index !== setIndex);
      } else {
        return [...prevCompletedSets, setIndex];
      }
    });
    updateSet(setIndex, repsInput, weightInput, exerciseIndex, completedInput)
  };

  const setCheckCompleted = (setIndex) => {
    setCompletedSets((prevCompletedSets) => {
      if (prevCompletedSets.includes(setIndex)) {
        return prevCompletedSets.filter((index) => index !== setIndex);
      } else {
        return [...prevCompletedSets, setIndex];
      }
    });
  }

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
      {Array.from({ length: setsInfo.length }, (_, setIndex) => (
        <SetsRepsInput key={setIndex} setIndex={setIndex} handleSetComplete={handleSetComplete} completedSets={completedSets} setInfo={setsInfo[setIndex]} setCheckCompleted={setCheckCompleted} handleSetChange={handleSetChange}/>
      ))}
    </>
  );
};