import { useState, useEffect, JSX } from "react";
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
import FooterComponent from "./components/FooterComponent";
import CryptoJS from "crypto-js";

const secretKey = "secretKey";

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

function App() {
  const limit: number = 18;
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [stage, setStage] = useState<number>(0);
  const [portion, setPortion] = useState<number>(1);
  const [initialWordsList, setInitialWordsList] = useState<VerbType[]>([]);
  const [wordsList, setWordsList] = useState<VerbType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [verbsLength, setVerbsLength] = useState<number>(0);
  const [isExam, setIsExam] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [hashedVerbs, setHashedVerbs] = useState<VerbType[]>([]);
  const [requestStatus, setRequestStatus] = useState<"idle" | "pending" | "succeeded" | "failed">("idle");
  const [correctVerbs, setCorrectVerbs] = useState<number[]>([]);
  const filteredWordsList: VerbType[] = wordsList.filter((word) => !correctVerbs.includes(word.id));

  useEffect(() => {
    const savedPortion = localStorage.getItem("portion");
    const savedStage = localStorage.getItem("stage");
    const savedIsStarted = localStorage.getItem("isStarted");
    const savedIsExam = localStorage.getItem("isExam");
    const encryptedVerbs = localStorage.getItem("hashedVerbs");
    const savedCorrectVerbs = localStorage.getItem("correctVerbs");

    if (encryptedVerbs) {
      try {
        const bytes = CryptoJS.AES.decrypt(encryptedVerbs, secretKey);
        const decryptedString = bytes.toString(CryptoJS.enc.Utf8);

        if (!decryptedString) {
          console.error("Ошибка: Данные не были расшифрованы.");
        } else {
          const parsedData = JSON.parse(decryptedString);
          setHashedVerbs(parsedData);
        }
      } catch (error) {
        console.error("Ошибка расшифровки:", error);
      }
    }

    if (savedPortion) setPortion(Number(savedPortion));
    if (savedStage) setStage(Number(savedStage));
    if (savedIsStarted) setIsStarted(JSON.parse(savedIsStarted));
    if (savedIsExam) setIsExam(JSON.parse(savedIsExam));
    if (savedCorrectVerbs) setCorrectVerbs(JSON.parse(savedCorrectVerbs));
    setIsLoading(false);
  }, []);

  const decryptData = (data: string, secretKey: string): VerbType[] => {
    const bytes = CryptoJS.AES.decrypt(data, secretKey);
    const decryptedVerbs = bytes && JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedVerbs;
  };

  const encryptData = (data: VerbType[]): string => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
  };

  useEffect(() => {
    setRequestStatus("pending");
    if (isLoading) return;

    try {
      if (!isExam) {
        const fetchVerbs = fetch(`/verbs/fetch?limit=${limit}&portion=${portion}`);
        fetchVerbs
          .then((res) => res.json())
          .then((data) => {
            const decryptedVerbs = decryptData(data.results, secretKey);

            if (!hashedVerbs.some((verb) => decryptedVerbs.some((v: VerbType) => v.id === verb.id))) {
              const newHashedVerbs = [...hashedVerbs, ...decryptedVerbs];
              const encryptedVerbs = encryptData(newHashedVerbs);
              localStorage.setItem("hashedVerbs", encryptedVerbs);
            }

            setInitialWordsList(decryptedVerbs);
            setWordsList(decryptedVerbs);
            setVerbsLength(data.length);
            setRequestStatus("succeeded");
          })
          .catch((err) => console.error(err));
      } else {
        setShowAlert(true);
        localStorage.setItem("correctVerbs", JSON.stringify([]));
        setCorrectVerbs([]);

        const encryptedVerbs = localStorage.getItem("hashedVerbs");
        const decryptedVerbs = encryptedVerbs ? decryptData(encryptedVerbs, secretKey) : [];

        if (encryptedVerbs && decryptedVerbs.length === limit * 5) {
          setWordsList(shuffle(decryptedVerbs));
          setRequestStatus("succeeded");
        } else {
          const fetchVerbs = fetch(`/verbs/fetch?limit=${limit}&portion=${portion}&isExam=true`);
          fetchVerbs
            .then((res) => res.json())
            .then((data) => {
              const decryptedVerbs = decryptData(data.results, secretKey);

              if (!hashedVerbs.some((verb) => decryptedVerbs.some((v: VerbType) => v.id === verb.id))) {
                const newHashedVerbs = [...hashedVerbs, ...decryptedVerbs];
                const encryptedVerbs = encryptData(newHashedVerbs);
                localStorage.setItem("hashedVerbs", encryptedVerbs);
              }

              setInitialWordsList(decryptedVerbs);
              setWordsList(shuffle(decryptedVerbs));
              setRequestStatus("succeeded");
            })
            .catch((err) => console.error(err));
        }
      }
    } catch (err) {
      console.error(err);
      setRequestStatus("failed");
    }
  }, [portion, limit, isExam, isLoading, hashedVerbs]);

  const handleClear = () => {
    localStorage.clear();
    setIsExam(false);
    setCorrectVerbs([]);
    setWordsList(initialWordsList);
    setIsStarted(false);
  };

  const renderContent = (): JSX.Element => {
    const components: { [key: number]: JSX.Element } = {
      1:
        wordsList.length === 0 ? (
          <TheEndComponent setPortion={setPortion} setIsStarted={setIsStarted} setIsExam={setIsExam} />
        ) : (
          <Learning verbs={filteredWordsList} portion={portion} stage={stage} setStage={setStage} />
        ),
      2: (
        <Training
          verbs={filteredWordsList}
          setStage={setStage}
          setWordsList={setWordsList}
          initialWordsList={initialWordsList}
          setCorrectVerbs={setCorrectVerbs}
        />
      ),
      3: (
        <Retelling
          verbs={initialWordsList}
          portion={portion}
          setPortion={setPortion}
          setStage={setStage}
          isExam={isExam}
          setIsExam={setIsExam}
          setHashedVerbs={setHashedVerbs}
          setCorrectVerbs={setCorrectVerbs}
        />
      ),
    };
    return components[stage] || null;
  };

  if (requestStatus === "pending") {
    return <Loader>Загрузка...</Loader>;
  } else if (requestStatus === "succeeded") {
    return (
      <Wrapper>
        {showConfirm && <ConfirmComponent fn={handleClear} setShowConfirm={setShowConfirm} />}
        <Header
          isStarted={isStarted}
          setIsStarted={setIsStarted}
          setStage={setStage}
          verbsLength={verbsLength}
          setPortion={setPortion}
        />
        {isStarted && !isLoading && (
          <Main>
            <MainHeader>
              <Reset showConfirm={showConfirm} setShowConfirm={setShowConfirm} />
              {!isExam && <Process portion={portion} lastVerb={verbsLength / limit} />}
            </MainHeader>

            {showAlert && <AlertComponent setShowAlert={setShowAlert} />}

            {renderContent()}
          </Main>
        )}

        <FooterComponent />
      </Wrapper>
    );
  }
}

export default App;
