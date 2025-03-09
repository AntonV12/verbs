import { useState, useEffect } from "react";
import { Main, Wrapper, Loader, MainHeader } from "./components/styles";
import Header from "./components/Header";
import Learning from "./components/Learning";
import Process from "./components/Process";
import Training from "./components/Training";
import Retelling from "./components/Retelling";
import TheEndComponent from "./components/TheEndComponent";
import Reset from "./components/Reset";
import ConfirmComponent from "./components/ConfirmComponent";
import AlertComponent from "./components/AlertComponent";

export type VerbType = {
  id: number;
  verb: string;
  translates: string[];
  examples: string[];
};

const shuffle = (array: VerbType[]): VerbType[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

/* const fetchVerbs = fetch("/verbs/fetch")
  .then((res) => res.json())
  .catch((err) => console.error(err)); */

function App() {
  const limit: number = 18;
  //const verbs: VerbType[] = use(fetchVerbs);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [stage, setStage] = useState<number>(0);
  const [portion, setPortion] = useState<number>(1);
  const [wordsList, setWordsList] = useState<VerbType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [lastVerb, setLastVerb] = useState<number>(0); /* verbs.length / limit */
  const [isExam, setIsExam] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [hashedVerbs, setHashedVerbs] = useState<VerbType[]>([]);

  useEffect(() => {
    const savedPortion = localStorage.getItem("portion");
    const savedStage = localStorage.getItem("stage");
    const savedIsStarted = localStorage.getItem("isStarted");
    const savedIsExam = localStorage.getItem("isExam");
    const hashedVerbs = localStorage.getItem("hashedVerbs");

    if (savedPortion) setPortion(Number(savedPortion));
    if (savedStage) setStage(Number(savedStage));
    if (savedIsStarted) setIsStarted(JSON.parse(savedIsStarted));
    if (savedIsExam) setIsExam(JSON.parse(savedIsExam));
    if (hashedVerbs) setHashedVerbs(JSON.parse(hashedVerbs));

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isLoading) return;

    if (!isExam) {
      const fetchVerbs = fetch(`/verbs/fetch?limit=${limit}&portion=${portion}`);
      fetchVerbs
        .then((res) => res.json())
        .then((data) => {
          if (!hashedVerbs.some((verb) => data.results.some((v: VerbType) => v.id === verb.id))) {
            const newHashedVerbs = [...hashedVerbs, ...data.results];
            localStorage.setItem("hashedVerbs", JSON.stringify(newHashedVerbs));
          }

          setWordsList(data.results);
          setLastVerb(data.length / limit);
        })
        .catch((err) => console.error(err));
    } else {
      setShowAlert(true);

      const storedHashedVerbs = localStorage.getItem("hashedVerbs");
      if (storedHashedVerbs) {
        const hashedVerbs = JSON.parse(storedHashedVerbs);
        setWordsList(shuffle(hashedVerbs));
      } else {
        const fetchVerbs = fetch(`/verbs/fetch?limit=${limit}&portion=${portion}&isExam=true`);
        fetchVerbs
          .then((res) => res.json())
          .then((data) => {
            if (!hashedVerbs.some((verb) => data.results.some((v: VerbType) => v.id === verb.id))) {
              const newHashedVerbs = [...hashedVerbs, ...data.results];
              localStorage.setItem("hashedVerbs", JSON.stringify(newHashedVerbs));
            }

            setWordsList(shuffle(data.results));
          })
          .catch((err) => console.error(err));
      }
    }
  }, [portion, limit, isExam, isLoading, hashedVerbs]);

  const handleClear = () => {
    localStorage.clear();
    window.location.reload();
  };

  const renderContent = () => {
    if (wordsList.length === 0) return null;
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
          isExam={isExam}
          setIsExam={setIsExam}
          setHashedVerbs={setHashedVerbs}
        />
      );
    }
    return null;
  };

  if (isLoading || wordsList.length === 0) {
    return <Loader>Загрузка...</Loader>;
  }

  return (
    <Wrapper>
      {showConfirm && <ConfirmComponent fn={handleClear} setShowConfirm={setShowConfirm} />}
      <Header isStarted={isStarted} setIsStarted={setIsStarted} setStage={setStage} />
      {isStarted && !isLoading && (
        <Main>
          <MainHeader>
            <Reset showConfirm={showConfirm} setShowConfirm={setShowConfirm} />
            {!isExam && <Process portion={portion} lastVerb={lastVerb} />}
          </MainHeader>

          {showAlert && <AlertComponent setShowAlert={setShowAlert} />}

          {renderContent()}
        </Main>
      )}
    </Wrapper>
  );
}

export default App;
