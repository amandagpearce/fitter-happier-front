import { getExercises } from "@component/lib/exercise";
import Card from "@component/components/ui/Card";
import classes from "./Index.module.css";
import ExercisesLogger from "@component/components/main/ExercisesLogger";

export async function getStaticProps() {
  console.log("Get static props home");
  const exercises = await getExercises();
  console.log("exercises", exercises);
  return { props: { exercises } };
}

export default function Home({ exercises }) {
  return (
    <>
      <main className={classes.mainContent}>
        <div className="container">
          <Card className="exercises-logger">
            <ExercisesLogger exercises={exercises} />
          </Card>
        </div>
      </main>
    </>
  );
}
