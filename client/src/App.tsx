import { use, useState, useEffect } from "react";
import { Main, Wrapper, Loader } from "./components/styles";
import Header from "./components/Header";
import Learning from "./components/Learning";
import Process from "./components/Process";
import Training from "./components/Training";
import Retelling from "./components/Retelling";
import TheEndComponent from "./components/TheEndComponent";

export type VerbType = {
  id: number;
  verb: string;
  translates: string[];
  examples: string[];
};

type portionHistoryType = {
  rightVerbs: number[];
  wrongVerbs: number[];
};

const shuffle = (array: VerbType[]): VerbType[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

const fetchVerbs = fetch("/verbs/fetch")
  .then((res) => res.json())
  .catch((err) => console.error(err));

function App() {
  const verbs: VerbType[] = use(fetchVerbs);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [stage, setStage] = useState<number>(0);
  const [portion, setPortion] = useState<number>(0);
  const limit: number = 18;
  const [wordsList, setWordsList] = useState<VerbType[]>([]);
  const [portionsHistory, setPortionsHistory] = useState<portionHistoryType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [lastVerb, setLastVerb] = useState<number>(
    Math.ceil(
      verbs.length / limit + portionsHistory.reduce((acc, portion) => acc + portion.wrongVerbs.length, 0) / limit
    )
  );

  useEffect(() => {
    const savedPortion = localStorage.getItem("portion");
    const savedStage = localStorage.getItem("stage");
    const savedPortionHistory = localStorage.getItem("portionsHistory");
    const savedIsStarted = localStorage.getItem("isStarted");

    if (savedPortion) setPortion(Number(savedPortion));
    if (savedStage) setStage(Number(savedStage));
    if (savedPortionHistory) setPortionsHistory(JSON.parse(savedPortionHistory));
    if (savedIsStarted) setIsStarted(JSON.parse(savedIsStarted));

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!verbs) return;

    if (portion === 0) {
      setWordsList(verbs.slice(0, limit));
    } else if (portion % 5 !== 0) {
      const newWordsList = verbs
        .filter((verb) => !portionsHistory.some((portion) => portion.rightVerbs.includes(verb.id)))
        .slice(0, limit);

      setWordsList(newWordsList);
      setLastVerb((prev) => Math.ceil((verbs.length + prev) / limit));
    } else {
      alert("Контрольная работа");

      const lastFivePortions = portionsHistory.slice(-5);
      const verbsFromLastFivePortions = new Set<number>();
      lastFivePortions.forEach((portion) => {
        portion.rightVerbs.forEach((verbId) => verbsFromLastFivePortions.add(verbId));
        portion.wrongVerbs.forEach((verbId) => verbsFromLastFivePortions.add(verbId));
      });

      const newWordsList = shuffle(verbs.filter((verb) => verbsFromLastFivePortions.has(verb.id)));

      setWordsList(newWordsList);
      setLastVerb((prev) => Math.ceil((verbs.length + prev) / limit));
    }
  }, [portion, limit, verbs, portionsHistory]);

  const renderContent = () => {
    if (stage === 1) {
      return wordsList.length === 0 ? (
        <TheEndComponent />
      ) : (
        <Learning verbs={wordsList} portion={portion} stage={stage} setStage={setStage} />
      );
    } else if (stage === 2) {
      return <Training verbs={wordsList} setStage={setStage} />;
    } else if (stage === 3) {
      return (
        <Retelling
          verbs={wordsList}
          portion={portion}
          setPortion={setPortion}
          setStage={setStage}
          portionsHistory={portionsHistory}
          setPortionsHistory={setPortionsHistory}
        />
      );
    }
    return null;
  };

  if (!verbs || isLoading) {
    return <Loader>Загрузка...</Loader>;
  }

  return (
    <Wrapper>
      <Header isStarted={isStarted} setIsStarted={setIsStarted} setStage={setStage} />
      {isStarted && (
        <Main>
          <Process portion={portion} lastVerb={lastVerb} isStarted={isStarted} />
          {renderContent()}
        </Main>
      )}
    </Wrapper>
  );
}

export default App;
