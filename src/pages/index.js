import { getExercises } from "@component/lib/exercise";
import Card from "@component/components/ui/Card";
import ExercisesLogger from "@component/components/main/ExercisesLogger";
import MyExercises from "@component/components/main/MyExercises";

export async function getStaticProps() {
  const exercises = await getExercises();
  return { props: { exercises } };
}

export default function Home({ exercises }) {
  return (
    <>
      <div className="container">
        <Card className="exercises-logger">
          <ExercisesLogger exercises={exercises} />
        </Card>

        <Card className="user-exercises" title="Meus Exercícios">
          <MyExercises />
        </Card>
      </div>
    </>
  );
}
