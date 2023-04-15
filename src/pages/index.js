import Head from "next/head";
import { Inter } from "next/font/google";
import { getExercises } from "@component/lib/exercise";

const inter = Inter({ subsets: ["latin"] });

export async function getStaticProps() {
  console.log("Get static props home");
  const exercises = await getExercises();
  console.log("exercises", exercises);
  return { props: { exercises } };
}

export default function Home({ exercises }) {
  return (
    <>
      <Head>
        <title>Fitter Happier</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="container">
          <div className="exercises-logger">
            <div className="row">
              <div className="col">
                <ul>
                  {exercises.map((exercise) => {
                    return <li key={exercise.id}>{exercise.type}</li>;
                  })}
                </ul>
              </div>
              <div className="col">My another Column</div>
              <div className="col">Yay Column</div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
