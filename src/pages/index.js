import { getExercises } from "@component/lib/exercise";
import Card from "@component/components/ui/Card";
import ExercisesLogger from "@component/components/main/ExercisesLogger";
import MyExercises from "@component/components/main/MyExercises";

export async function getStaticProps() {
  console.log("Get static props home");
  const exercises = await getExercises();
  console.log("exercises", exercises);
  return { props: { exercises } };
}

export default function Home({ exercises }) {
  return (
    <>
      <div className="container">
        <Card className="exercises-logger">
          <ExercisesLogger exercises={exercises} />
        </Card>

        <Card className="user-exercises">
          <MyExercises />
        </Card>
      </div>
    </>
  );
}
