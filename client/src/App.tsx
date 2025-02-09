import { use, useState } from "react";
import Header from "./components/Header";
import Learning from "./components/Learning";
import { Main } from "./components/styles";
import Process from "./components/Process";
import Training from "./components/Training";
import Retelling from "./components/Retelling";

export type VerbType = {
  id: number;
  verb: string;
  translates: string[];
  examples: string[];
};

const fetchVerbs = fetch("/verbs/fetch")
  .then((res) => res.json())
  .catch((err) => console.error(err));

function App() {
  const verbs: VerbType[] = use(fetchVerbs);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [stage, setStage] = useState<number>(0);
  const [portion, setPortion] = useState<number>(0);
  let content;

  if (stage === 1) {
    content = (
      <Learning
        verbs={verbs.slice(portion * 18, 18 * (portion + 1))}
        portion={portion}
        stage={stage}
        setStage={setStage}
      />
    );
  } else if (stage === 2) {
    content = <Training verbs={verbs.slice(portion * 18, 18 * (portion + 1))} setStage={setStage} />;
  } else if (stage === 3) {
    content = <Retelling verbs={verbs.slice(portion * 18, 18 * (portion + 1))} />;
  }

  return (
    <>
      <Header isStarted={isStarted} setIsStarted={setIsStarted} setStage={setStage} />
      {isStarted && (
        <Main>
          <Process portion={portion} />
          {content}
        </Main>
      )}
    </>
  );
}

export default App;
