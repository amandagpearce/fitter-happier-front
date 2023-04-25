export async function getExercises() {
  const response = await fetch("http://127.0.0.1:5000/exercise");
  const exercises = await response.json();
  return exercises;
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

  var response = await fetch(
    "http://127.0.0.1:5000/exercise/log/" + data.exercise_id,
    requestOptions
  );

  return response.status;
}

export async function changeExerciseTitle(data) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    name: data.newTitle,
  });

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  var response = await fetch(
    "http://127.0.0.1:5000/exercise/" + data.exercise_id,
    requestOptions
  );

  return response;
}

export async function deleteVideo(data) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  var response = await fetch(
    "http://127.0.0.1:5000/video/" + data.video_id,
    requestOptions
  );

  console.log("deleted");

  return response;
}

export async function deleteExercise(id) {
  console.log("ID", id);
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  var response = await fetch(
    "http://127.0.0.1:5000/exercise/" + id,
    requestOptions
  );

  console.log("deleted");

  return response;
}

export async function addNewExercise(data) {
  var myHeaders = new Headers();

  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(data),
    newId;

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  var response = await fetch("http://127.0.0.1:5000/exercise", requestOptions)
    .then((response) => response.json())
    .then((result) => (newId = result.id))
    .catch((error) => console.log("error", error));

  return { newExerciseId: newId };
}

export async function addNewVideo(data) {
  var myHeaders = new Headers();

  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(data),
    newId;

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  var response = await fetch("http://127.0.0.1:5000/video", requestOptions)
    .then((response) => response.json())
    .then((result) => (newId = result.id))
    .catch((error) => console.log("error", error));

  return { newVideoId: newId };
}

export async function addVideoToExercise(data) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
  };

  var response = await fetch(
    "http://127.0.0.1:5000/exercise/" +
      data.exercise_id +
      "/video/" +
      data.video_id,
    requestOptions
  );

  return response;
}
