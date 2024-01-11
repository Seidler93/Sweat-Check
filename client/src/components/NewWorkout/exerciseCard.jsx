import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck, faPlus, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import SetsRepsComp from './SetsRepsComp';
import { useUserContext } from "../../utils/UserContext";

export default function ExerciseCard({ superset, index, }) {
  const [setCount, setSetCount] = useState(1);
  const [addExercise, setAddExercise] = useState(false);
  const [exerciseInput, setExerciseInput] = useState('');
  const [notes, setNotes] = useState('');
  const [showSets, setShowSets] = useState(true);
  const [show, setShow] = useState(false);
  const {setCurrentWorkout} = useUserContext()

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDropDownClick = () => {
    setShowSets((prevShowSets) => !prevShowSets);
  };

  const addToSuperSet = (newSSExercise, supersetIndex, setCount) => {
    setCurrentWorkout((prevCurrentWorkout) => {
      const updatedWorkout = [...prevCurrentWorkout.workout];
      // Get the exercise group at the specified index
      const superSet = updatedWorkout[supersetIndex].exercises;
      let sets = [];
      for (let i = 0; i < setCount; i++) {
        sets = [...sets, {reps: 0, weight: 0, completed: false} ]
      }
      // Add a new exercise to the exercise group
      const updatedSuperSet = [...superSet, { 
        exerciseName: newSSExercise,
        sets: sets
      }];
      
      // Update the exercise group in the workout array
      updatedWorkout[supersetIndex].exercises = [ ...updatedSuperSet ];
      return {...prevCurrentWorkout, workout: updatedWorkout};
    });
  };

  const handleAddToSuperSet = () => {
    addToSuperSet(exerciseInput, index, setCount);
    setAddExercise(false);
    setExerciseInput('');
  };

  const addSetToExercise = (exerciseIndex, supersetIndex, setCount) => {
    setCurrentWorkout((prevCurrentWorkout) => {
      const updatedWorkout = [...prevCurrentWorkout.workout];
      // Get the exercise group at the specified index
      const superSet = updatedWorkout[supersetIndex].exercises;

      // Update sets with a new empty set
      const newSets = [...superSet[exerciseIndex].sets, {reps: superSet[exerciseIndex].sets[setCount], weight: superSet[exerciseIndex].sets[setCount], completed: false}]
      superSet[exerciseIndex].sets = newSets  
      return {...prevCurrentWorkout, workout: updatedWorkout};
    });
  }

  const handleAddSet = () => {
    for (let i = 0; i < superset.exercises.length; i++) {
      addSetToExercise(i, index, setCount)      
    }
    setSetCount(setCount + 1)
  };

  const updateExercise = (exerciseObject, setIndex, exerciseIndex, supersetIndex) => {
    setCurrentWorkout((prevCurrentWorkout) => {
      const updatedWorkout = [...prevCurrentWorkout.workout];
      // Get the exercise group at the specified index
      const exerciseGroup = [...updatedWorkout[supersetIndex].exercises];

      // Update exercise sets
      exerciseGroup[exerciseIndex].sets[setIndex] = exerciseObject     
      return {...prevCurrentWorkout, workout: updatedWorkout};
    });
  }

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
       superset.exercises.length === 1 ? (
        <h3 className='text-white'>{superset[0].exerciseName}</h3>
      ) : (
        <h3 className='text-white d-flex justify-content-start'>
          {superset.exercises.map((exercise, index) => (
            <h3 key={index}>
              {index > 0 && ', '}
              {exercise.exerciseName}
            </h3>
          ))}
        </h3>
      )}            
    </div>
  );
};
