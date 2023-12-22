import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck, faPlus, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';

export default function ExerciseCard({ superset, index, addToSuperSet }) {
  const [setCount, setSetCount] = useState(1);
  const [completedSets, setCompletedSets] = useState([]);
  const [allSetsCompleted, setAllSetsCompleted] = useState(false);
  const [addExercise, setAddExercise] = useState(false);
  const [exerciseInput, setExerciseInput] = useState('');
  const [notes, setNotes] = useState('');
  const [showSets, setShowSets] = useState(true);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDropDownClick = () => {
    setShowSets((prevShowSets) => !prevShowSets);
  };

  const handleSetComplete = async (setIndex) => {
    setCompletedSets((prevCompletedSets) => {
      if (prevCompletedSets.includes(setIndex)) {
        return prevCompletedSets.filter((index) => index !== setIndex);
      } else {
        return [...prevCompletedSets, setIndex];
      }
    });
  };

  const handleAddToSuperSet = () => {
    addToSuperSet(exerciseInput, index);
    setAddExercise(false);
    setExerciseInput('');
  };

  useEffect(() => {
    if (completedSets.length === setCount) {
      setAllSetsCompleted(true);
    } else if (completedSets.length !== setCount) {
      setAllSetsCompleted(false);
    }
  }, [completedSets, setCount]);

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
      <button className='carrot'>{showSets ? (
        <FontAwesomeIcon
          icon={faCaretDown}
          onClick={() => handleDropDownClick(!showSets)}
          className='openSets-toggle'
          rotation={180}
        />
      ) : (
        <FontAwesomeIcon
          icon={faCaretDown}
          onClick={() => handleDropDownClick(!showSets)}
          className='openSets-toggle'
        />
      )}</button>
      {showSets ? (
        <>
          {superset.map((exercise, exerciseIndex) => (
            <div className='mb-3' key={exerciseIndex}>
              <h4 className='text-white'>{exercise.exerciseName}</h4>
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
              {notes ? (
                <div className='round border border-dark bg-secondary text-white my-2'>
                  <h5 className='px-2 pt-2'>Notes</h5>
                  <p className='px-3'>{notes}</p>
                </div>
              ) : ''}
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
          <div className='d-flex mt-3'>
            <button className='modal-btn me-1 px-1' onClick={() => setSetCount(setCount + 1)}>
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
      ) : ''}
    </div>
  );
};
