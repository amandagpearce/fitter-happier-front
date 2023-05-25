import React, { useState } from "react";
import { VALIDATOR_REQUIRE } from "../util/validators";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useForm } from "../../hooks/form-hook";
import Select from "../ui/Select";
import Card from "../ui/Card";
import {
  addNewVideo,
  addNewExercise,
  addVideoToExercise,
} from "@component/lib/exercise";

const NewExerciseForm = ({ onNewExerciseCreated }) => {
  let [currentSelectVal, setCurrentSelectVal] = useState("A");

  const [formState, inputHandler] = useForm(
    // formState and inputHandler are returned in the hook
    {
      exerciseTitle: {
        value: "",
        isValid: false,
      },
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

  const onSelectChange = (value) => {
    console.log("value", value);
    setCurrentSelectVal(() => value);
  };

  let [fields, setFields] = useState([
    <div className="col-6" key="1">
      <Input
        element="input"
        type="text"
        label="Link do vídeo:"
        id="ytId_1"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Link do youtube"
        onInput={inputHandler}
      />
    </div>,
    <div className="col-6" key="2">
      <Input
        element="input"
        type="text"
        label="Título:"
        id="videoTitle_1"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Insira um título"
        onInput={inputHandler}
      />
    </div>,
  ]);

  let onFieldDuplicate = (e) => {
    e.preventDefault();
    setFields([
      ...fields,
      <div className="col-6" key={`ytId_${fields.length}`}>
        <Input
          element="input"
          type="text"
          label="Link do vídeo:"
          id={`ytId_${fields.length}`}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Link do youtube"
          onInput={inputHandler}
        />
      </div>,
      <div className="col-6" key={`videoTitle_${fields.length}`}>
        <Input
          element="input"
          type="text"
          label="Título:"
          id={`videoTitle_${fields.length}`}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Insira um título"
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

        var video_id = data[key1].value.split("v=")[1];
        var ampersandPosition = video_id.indexOf("&");
        if (ampersandPosition != -1) {
          video_id = video_id.substring(0, ampersandPosition);
        }
        tempObj["yt_id"] = video_id;
        console.log("video_id", video_id);

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

  const newExerciseSubmitHandler = async (event) => {
    event.preventDefault();

    // data to create new exercise
    var newExercise = {
      name: formState.inputs.exerciseTitle.value,
      type: currentSelectVal,
      //   user_id: "10",
    };

    let videos = Object.fromEntries(
      Object.entries(formState.inputs).filter(
        ([key]) => key.includes("videoTitle") || key.includes("ytId")
      )
    );

    // array to create new videos
    let videosArr = buildVideosArray(videos);

    try {
      const res1 = await addNewExercise(newExercise);
      for (let x = 0; x < videosArr.length; x++) {
        const res2 = await addNewVideo(videosArr[x]);

        const data = {
          exercise_id: res1.newExerciseId,
          video_id: res2.newVideoId,
        };

        await addVideoToExercise(data);
      }

      onNewExerciseCreated();
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <React.Fragment>
      <Card className="newExerciseModal">
        <div className="row">
          <div className="col-1">
            <Select
              name="Selecione o exercício"
              id="newExerciseType"
              options={["A", "B", "C"]}
              onChange={onSelectChange}
              validators={[VALIDATOR_REQUIRE()]}
            />
          </div>
          <div className="col-11">
            <Input
              element="input"
              type="text"
              label="Título:"
              placeholder=""
              id="exerciseTitle"
              identifier="newExerciseTitle"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Por favor insira uma descrição válida"
              onInput={inputHandler}
            />
          </div>
        </div>

        <h4>Vídeos:</h4>
        <div className="row" style={{ maxHeight: "180px", overflowY: "auto" }}>
          <div className="col-11" style={{ paddingRight: "0" }}>
            <div className="row">{fields}</div>
          </div>

          <div className="col-1 row">
            <Button onClick={onFieldDuplicate} title="addVideo">
              +
            </Button>
          </div>
        </div>

        <Button
          disabled={!formState.isValid}
          onClick={newExerciseSubmitHandler}
          size={"large"}
          title={"modalAdd"}
        >
          Adicionar exercício
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default NewExerciseForm;
