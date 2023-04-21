import { getExercises } from "@component/lib/exercise";
import Card from "@component/components/ui/Card";
import ExercisesLogger from "@component/components/main/ExercisesLogger";
import MyExercises from "@component/components/main/MyExercises";
import MyGoals from "@component/components/main/MyGoals";
// import { Sofia_Sans_Condensed } from "next/font/google";
import { Merriweather_Sans } from "next/font/google";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./index.module.css";

const font = Merriweather_Sans({ subsets: ["latin"], weight: "400" });

export async function getServerSideProps() {
  const exercises = await getExercises();
  return { props: { exercises } };
}

export default function Home({ exercises }) {
  return (
    <>
      <div className={`${font.className} appContainer container-fluid`}>
        <Card className="exercises-logger">
          <ExercisesLogger exercises={exercises} />
        </Card>

        <Card className="user-exercises" title="Meus Exercícios">
          <MyExercises />
        </Card>

        <Card className="user-goals">
          <MyGoals />
        </Card>
      </div>
    </>
  );
}