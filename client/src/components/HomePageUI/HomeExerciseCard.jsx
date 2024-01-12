export default function HomeExerciseCard({ exercises }) {
  const getFormattedSets = (sets) => {
    const groupedSets = sets.reduce((grouped, set) => {
      const key = set.reps;
      const existingSet = grouped[key];
  
      if (existingSet) {
        existingSet.count += 1;
      } else {
        grouped[key] = { reps: set.reps, count: 1 };
      }
  
      return grouped;
    }, {});
  
    const formattedSets = Object.values(groupedSets)
      .map((group) => `${group.count}x${group.reps}`)
      .join('/');
  
    return <h3>{formattedSets}</h3>;
  };

  return (
    <div className='border-red'>
      {exercises.exercises.map((exercise, index) => (
        <div key={exercise.exerciseName} className='d-flex flex-column'>
          <div className='d-flex'>
            <h3 className='px-2'>{exercise.exerciseName}</h3>
            {getFormattedSets(exercise.sets)}
          </div>
          {exercises.length === index +1 && <h3 className='text-center'>+</h3>}
        </div>
      ))}
    </div>
  );
};



