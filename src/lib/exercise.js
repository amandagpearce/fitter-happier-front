export async function getExercises() {
  const response = await fetch("http://localhost:5000/exercise");
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
    "http://localhost:5000/exercise/log/" + data.exercise_id,
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
    "http://localhost:5000/exercise/" + data.exercise_id,
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
    "http://localhost:5000/video/" + data.video_id,
    requestOptions
  );

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
    "http://localhost:5000/exercise/" + id,
    requestOptions
  );

  return response;
}

export async function addNewExercise(data) {
  const myHeaders = new Headers(),
    raw = JSON.stringify(data);

  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(
    "http://localhost:5000/exercise",
    requestOptions
  );
  const result = await response.json();

  return { newExerciseId: result.id };
}

export async function addNewVideo(data) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const raw = JSON.stringify(data);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch("http://localhost:5000/video", requestOptions);
  const result = await response.json();
  const newId = result.id;

  return { newVideoId: newId };
}

export async function addVideoToExercise(data) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
  };

  const url =
    "http://localhost:5000/exercise/" +
    data.exercise_id +
    "/video/" +
    data.video_id;

  const response = await fetch(url, requestOptions);

  return response;
}
