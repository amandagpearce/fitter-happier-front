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

  var status = response.status;
  if (status === 201) {
    return true;
  } else {
    return false;
  }
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
