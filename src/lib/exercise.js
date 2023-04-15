function getExerciseType(exercise) {
  return {
    id: exercise.id,
    type: exercise.type,
  };
}

export async function getExercises() {
  const response = await fetch("http://127.0.0.1:5000/exercise");
  const exercises = await response.json();
  return exercises.map(getExerciseType);
}
