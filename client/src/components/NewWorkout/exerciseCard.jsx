import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck, faPlus, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import SetsRepsComp from './SetsRepsComp';

export default function ExerciseCard({ superset, index, addToSuperSet, updateExercise, addSetToExercise, woip }) {
  const [setCount, setSetCount] = useState(1);
  const [addExercise, setAddExercise] = useState(false);
  const [exerciseInput, setExerciseInput] = useState('');
  const [notes, setNotes] = useState('');
  const [showSets, setShowSets] = useState(true);
  const [show, setShow] = useState(false);

  // console.log(superset); 

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDropDownClick = () => {
    setShowSets((prevShowSets) => !prevShowSets);
  };

  const handleAddToSuperSet = () => {
    addToSuperSet(exerciseInput, index, setCount);
    setAddExercise(false);
    setExerciseInput('');
  };

  const handleAddSet = () => {
    for (let i = 0; i < superset.exercises.length; i++) {
      addSetToExercise(i, index, setCount)      
    }
    setSetCount(setCount + 1)
  };

  const completeSet = (setIndex, repsInput, weightInput, exerciseIndex, completedInput) => {
    const exerciseObject = {
      reps: repsInput,
      weight: weightInput, 
      completed: completedInput,
    }
    updateExercise(exerciseObject, setIndex, exerciseIndex, index )
  }

  const updateSet = (setIndex, repsInput, weightInput, exerciseIndex, completedInput) => {
    const exerciseObject = {
      reps: repsInput,
      weight: weightInput, 
      completed: completedInput,
    }
    updateExercise(exerciseObject, setIndex, exerciseIndex, index )
  }

  return (
    <div key={index} className='exercise-card d-flex flex-column my-2'>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='d-flex flex-column'>
            <textarea
              onChange={(e) => setNotes(e.target.value)}
              value={notes}
              className="form-control"
              placeholder="Enter exercise"
              name="" id="" cols="30" rows="10"
            ></textarea>
            <button variant="primary" onClick={handleClose} className='modal-btn ms-1 px-1'>
              Add notes
            </button>
          </div>
        </Modal.Body>
      </Modal>
      <button className='open-sets-toggle carrot'>{showSets ? (
        <FontAwesomeIcon
          icon={faCaretDown}
          onClick={() => handleDropDownClick(!showSets)}
          className='open-sets-toggle'
          rotation={180}
        />
      ) : (
        <FontAwesomeIcon
          icon={faCaretDown}
          onClick={() => handleDropDownClick(!showSets)}
          className='open-sets-toggle'
        />
      )}</button>
      {showSets ? (
        <>
          {superset.exercises.map((exercise, exerciseIndex) => (
            <div className='mb-3' key={exerciseIndex}>
              <h3 className='text-white'>{exercise.exerciseName}</h3>
              <SetsRepsComp updateSet={updateSet} setCount={setCount} completeSet={completeSet} exerciseIndex={exerciseIndex} setsInfo={exercise.sets}/>
            </div>
          ))}
          {notes ? (
            <div className='round border border-dark bg-secondary text-white my-2'>
              <h5 className='px-2 pt-2'>Notes</h5>
              <p className='px-3'>{notes}</p>
            </div>
          ) : ''}
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
          <div className='d-flex mt-3'>
            <button className='modal-btn me-1 px-1' onClick={() => handleAddSet()}>
              Add set
            </button>
            <button className='modal-btn mx-1 px-1' onClick={() => setAddExercise(!addExercise)}>
              Add exercise
            </button>
            <button variant="primary" onClick={handleShow} className='modal-btn ms-1 px-1'>
              Add notes
            </button>
          </div>
        </>
      ) : 
       superset.length === 1 ? (
        <h2 className='text-white ps-1'>{superset[0].exerciseName}</h2>
      ) : (
        <h2 className='text-white ps-1'>
          {superset.map((exercise, index) => (
            <span key={index}>
              {index > 0 && ', '}
              {exercise.exerciseName}
            </span>
          ))}
        </h2>
      )}            
    </div>
  );
};
