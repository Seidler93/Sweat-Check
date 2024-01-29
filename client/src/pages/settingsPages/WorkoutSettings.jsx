import React, { useState } from 'react';

const WorkoutSettings = () => {
  const [workoutPreferences, setWorkoutPreferences] = useState({
    difficulty: 'Intermediate',
    duration: 30,
    // Add more workout preferences as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkoutPreferences((prevPreferences) => ({
      ...prevPreferences,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>Workout Settings</h1>
      <label>
        Difficulty:
        <select name="difficulty" value={workoutPreferences.difficulty} onChange={handleChange}>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </label>
      <br />
      <label>
        Duration (minutes):
        <input type="number" name="duration" value={workoutPreferences.duration} onChange={handleChange} />
      </label>
      {/* Add more workout preferences as needed */}
    </div>
  );
};

export default WorkoutSettings;