import { getExercises } from "@component/lib/exercise";
import Card from "@component/components/ui/Card";
import ExercisesLogger from "@component/components/main/ExercisesLogger";
import MyExercises from "@component/components/main/MyExercises";
// import MyGoals from "@component/components/main/MyGoals";
import { Merriweather_Sans } from "next/font/google";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./index.module.css";
import Button from "@component/components/ui/Button";
import { useState, useCallback, useEffect } from "react";

const font = Merriweather_Sans({ subsets: ["latin"], weight: "400" });

export default function Home() {
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchExercisesHandler = useCallback(async () => {
    // useCallback here prevents loading loop due to useEffect
    // component first load => the data is fetched => the state changes => changing the state causes reevaluation
    setIsLoading(true);
    setError(null);

    try {
      const response = await getExercises();
      console.log("response", response);

      if (!response.length) {
        throw new Error("Algo deu errado!");
      }

      setExercises(() => response);
      console.log("exercises", exercises);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []); // no dependencies here since fetch is browser native

  useEffect(() => {
    // fetching data as soon as it loads
    fetchExercisesHandler();
  }, [fetchExercisesHandler]);

  return (
    <>
      <div className={`${font.className} appContainer container-fluid`}>
        <Card className="exercises-logger">
          <ExercisesLogger exercises={exercises} />
        </Card>

        <Card className="user-exercises" title="Meus Exercícios">
          <MyExercises exercises={exercises} />
        </Card>

        {/* <Card className="user-goals">
          <MyGoals />
        </Card> */}
      </div>
    </>
  );
}
