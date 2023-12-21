import { useState, useEffect  } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck, faPlus } from '@fortawesome/free-solid-svg-icons';

export default function ExerciseCard({superset, index, addToSuperSet}) {
  console.log(superset, index);
  const [setCount, setSetCount] = useState(1);
  const [completedSets, setCompletedSets] = useState([]);
  const [allSetsCompleted, setAllSetsCompleted] = useState(false);
  const [addExercise, setAddExercise] = useState(false);
  const [exerciseInput, setExerciseInput] = useState('');

  const handleSetComplete = async (setIndex) => {
    setCompletedSets((prevCompletedSets) => {
      if (prevCompletedSets.includes(setIndex)) {
        // Set is already completed, so remove it
        return prevCompletedSets.filter((index) => index !== setIndex);
      } else {
        // Set is incomplete, so mark it as complete
        return [...prevCompletedSets, setIndex];
      }
    });
  }

  const handleAddToSuperSet = () => {
    addToSuperSet(exerciseInput, index)
    console.log('adding exercise:', exerciseInput, index);
    setAddExercise(false)
    setExerciseInput('')
  }

  return (
    <div key={index} className='exercise-card d-flex flex-column my-2'>
      {superset.map((exercise) => (
        <div>
          <h4 className='text-white'>{exercise.exerciseName}</h4>
          <div className='text-white d-flex align-items-center justify-content-start'>
            <h4 className='w20 text-center'>Sets</h4>
            <h4 className='w30 text-center'>Reps</h4>
            <h4 className='w30 text-center'>Weight</h4>
          </div>
          {Array.from({ length: setCount }, (_, setIndex) => (
            <div key={setIndex} className='d-flex align-items-center justify-content-start mb-2'>
              <p className='text-white p-2 m-0 w20 text-center'>{setIndex + 1}</p>
              <input className='w30 px-2 me-1 form-control' type="text" placeholder='reps'/>
              <input className='w30 px-2 ms-1 form-control' type="text" placeholder='weight'/>
              <button
                onClick={() => handleSetComplete}
                className={"set-checkmark-btn"}
                >
                <FontAwesomeIcon
                  icon={faSquareCheck}
                  className={`set-checkmark `}
                  />
              </button>
            </div>
          ))}
        </div>
      ))}
      {addExercise ? (
            <div className='d-flex align-items-center mb-2 justify-content-between'>
              <input
                type="text"
                onChange={(e) => setExerciseInput(e.target.value)}
                value={exerciseInput}
                className="form-control"
                placeholder="Enter exercise"
                aria-describedby="basic-addon1"
              />
              <button type='submit' onClick={() => handleAddToSuperSet()} className='ms-2 add-exercise-btn'>
                <FontAwesomeIcon className='text-white' icon={faPlus} />
              </button>
            </div>
          ) : ''}
      <div className='d-flex mt-2'>
        <button className='modal-btn me-1 px-1' onClick={() => setSetCount(setCount + 1)}>
          Add set
        </button>
        <button className='modal-btn mx-1 px-1' onClick={() => setAddExercise(!addExercise)}>
          Add exercise
        </button>
        <button className='modal-btn ms-1 px-1'>
          Add notes
        </button>
      </div>
    </div>
  );
};