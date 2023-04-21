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

export async function logExercise(data) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var date = data.date,
    raw = JSON.stringify({
      date,
    });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(
    "http://127.0.0.1:5000/exercise/log/" + data.exercise_id,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}
