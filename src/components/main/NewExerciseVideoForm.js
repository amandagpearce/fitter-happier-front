import React, { useState } from "react";
import { VALIDATOR_REQUIRE } from "../util/validators";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useForm } from "../../hooks/form-hook";
import Select from "../ui/Select";
import Card from "../ui/Card";
import { addNewVideo, addVideoToExercise } from "@component/lib/exercise";

const NewExerciseVideoForm = ({ onNewVideoCreated, exerciseId }) => {
  const [formState, inputHandler] = useForm(
    // formState and inputHandler are returned in the hook
    {
      ytId_1: {
        value: "",
        isValid: false,
      },
      videoTitle_1: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  let [fields, setFields] = useState([
    <div className="col-6">
      <Input
        element="input"
        type="text"
        label="Video ID:"
        identifier={1}
        key={1}
        id="ytId_1"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Por favor insira um ID válido."
        onInput={inputHandler}
      />
    </div>,
    <div className="col-6">
      <Input
        element="input"
        type="text"
        label="Título:"
        key={2}
        id="videoTitle_1"
        identifier={2}
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Por favor insira um ID válido."
        onInput={inputHandler}
      />
    </div>,
  ]);

  let onFieldDuplicate = (e) => {
    e.preventDefault();
    setFields([
      ...fields,
      <div className="col-6">
        <Input
          element="input"
          type="text"
          label="Video ID:"
          key={fields.length + 1}
          id={`ytId_${fields.length}`}
          //   identifier={fields.length}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Por favor insira um ID válido."
          onInput={inputHandler}
        />
      </div>,
      <div className="col-6">
        <Input
          element="input"
          type="text"
          label="Título:"
          key={fields.length + 1}
          id={`videoTitle_${fields.length}`}
          //   identifier={fields.length + 2}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Por favor insira um título válido."
          onInput={inputHandler}
        />
      </div>,
    ]);
  };

  const buildVideosArray = (data) => {
    let array = [];

    for (const key1 in data) {
      var id = key1.split("_")[1];
      console.log("id", id);

      if (key1.indexOf("ytId") > -1) {
        var tempObj = {};
        tempObj["yt_id"] = data[key1].value;

        for (const key2 in data) {
          var id2 = key2.split("_")[1];
          if (key2.indexOf("videoTitle") > -1 && id2 === id) {
            tempObj["title"] = data[key2].value;

            array.push(tempObj);
          }
        }
      }
    }

    return array;
  };

  const newVideoSubmitHandler = async (event) => {
    event.preventDefault();

    let videos = Object.fromEntries(
      Object.entries(formState.inputs).filter(
        ([key]) => key.includes("videoTitle") || key.includes("ytId")
      )
    );

    // array to create new videos
    let videosArr = buildVideosArray(videos);

    try {
      for (var x = 0; x < videosArr.length; x++) {
        await addNewVideo(videosArr[x]).then(async (res) => {
          var data = {
            exercise_id: exerciseId,
            video_id: res.newVideoId,
          };

          await addVideoToExercise(data).then(() => {
            onNewVideoCreated();
          });
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <React.Fragment>
      <Card className="newExerciseModal">
        <div className="row">
          <div className="col-12">
            <h4>Vídeos:</h4>
          </div>
        </div>

        <div className="row" style={{ maxHeight: "180px", overflowY: "auto" }}>
          <div className="col-10" style={{ paddingRight: "0" }}>
            <div className="row">{fields}</div>
          </div>

          <div className="col-2 row">
            <Button onClick={onFieldDuplicate} title="addVideo">
              +
            </Button>
          </div>
        </div>

        <Button
          disabled={!formState.isValid}
          onClick={newVideoSubmitHandler}
          size={"large"}
          title={"modalAdd"}
        >
          Adicionar exercício
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default NewExerciseVideoForm;