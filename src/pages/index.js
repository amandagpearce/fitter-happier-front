import { useState, useCallback, useEffect } from "react";

import Card from "@component/components/ui/Card";
import ExercisesLogger from "@component/components/main/ExercisesLogger";
import MyExercises from "@component/components/main/MyExercises";
import MyGoals from "@component/components/main/MyGoals";

import "react-big-calendar/lib/css/react-big-calendar.css";
import classes from "./index.module.css";

import { Merriweather_Sans } from "next/font/google";
import { getExercises } from "@component/lib/exercise";

const font = Merriweather_Sans({ subsets: ["latin"], weight: "400" });

export default function Home() {
  let [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toggle, setToggle] = useState(false);

  const fetchExercisesHandler = useCallback(async () => {
    // useCallback here prevents loading loop due to useEffect
    // component first load => the data is fetched => the state changes => changing the state causes reevaluation
    setIsLoading(true);
    setError(null);

    try {
      const response = await getExercises();

      //   if (!response.length) {
      //     throw new Error("Algo deu errado!");
      //   }

      setExercises(() => (exercises = response));

      console.log("exercises", exercises);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []); // no dependencies here since fetch is browser native

  useEffect(() => {
    // fetching data as soon as it loads
    fetchExercisesHandler();
    console.log("fetchExercisesHandler() called");
  }, [fetchExercisesHandler, toggle]);

  return (
    <>
      <div
        className={`${font.className} ${classes.appContainer} container-fluid`}
      >
        {!!exercises.length && (
          <Card className="exercisesLogger">
            <ExercisesLogger exercises={exercises} />
          </Card>
        )}

        <Card className="user-exercises" title="Meus Exercícios">
          <MyExercises
            onDataChange={() => setToggle((prevState) => !prevState)}
            exercises={exercises}
          />
        </Card>

        <Card className="user-goals">
          <MyGoals />
        </Card>
      </div>
    </>
  );
}
