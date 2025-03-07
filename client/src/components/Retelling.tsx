import { VerbType } from "../App";
import { useState, useRef, useEffect } from "react";

const Span = ({
  verb,
  isChecking,
  textValue,
}: {
  verb: VerbType;
  isChecking: boolean;
  textValue: string;
}) => {
  const res = verb.examples.map((example) => {
    const isMissed = !textValue.toLowerCase().includes(example.toLowerCase());
    if (example.endsWith("?") || example.endsWith("!")) {
      return (
        <span key={example} className={isMissed && isChecking ? "missed" : ""}>
          {example + " "}
        </span>
      );
    } else {
      return (
        <span key={example} className={isMissed && isChecking ? "missed" : ""}>
          {example + ". "}
        </span>
      );
    }
  });

  return <>{res}</>;
};

const Retelling = ({
  verbs,
  portion,
  setPortion,
  setStage,
  setIsExam,
}: // portionsHistory,
// setPortionsHistory,
{
  verbs: VerbType[];
  portion: number;
  setPortion: React.Dispatch<React.SetStateAction<number>>;
  setStage: React.Dispatch<React.SetStateAction<number>>;
  setIsExam: React.Dispatch<React.SetStateAction<boolean>>;
  // portionsHistory: { rightVerbs: number[]; wrongVerbs: number[] }[];
  // setPortionsHistory: React.Dispatch<React.SetStateAction<{ rightVerbs: number[]; wrongVerbs: number[] }[]>>;
}) => {
  const [isShowArea, setIsShowArea] = useState<boolean>(false);
  const [isShowText, setIsShowText] = useState<boolean>(true);
  const [textValue, setTextValue] = useState<string>("");
  const [isGoAhead, setIsGoAhead] = useState<boolean | null>(null);
  //const [wrongs, setWrongs] = useState<Set<number>>(new Set());
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const ref = useRef<HTMLParagraphElement>(null);
  const [areaHeight, setAreaHeight] = useState<number>(0);

  useEffect(() => {
    if (ref.current) {
      const observer = new ResizeObserver(() => {
        setAreaHeight(ref.current!.clientHeight);
      });

      observer.observe(ref.current);

      return () => observer.disconnect();
    }
  }, []);

  const handleReady = () => {
    setIsShowArea(true);
    setIsShowText(false);
  };

  const handleLook = () => {
    setIsShowText(!isShowText);
  };

  const handleCheck = () => {
    setIsShowText(true);
    setIsChecking(true);

    // const newRights = new Set<number>();
    // const newWrongs = new Set<number>();

    // verbs.forEach((verb) => {
    //   if (
    //     verb.examples.every((example) =>
    //       textValue.toLowerCase().trim().includes(example.toLowerCase().trim())
    //     ) ||
    //     verb.examples.length === 0
    //   ) {
    //     newRights.add(verb.id);
    //   } else {
    //     newWrongs.add(verb.id);
    //     //setWrongs(newWrongs);
    //   }
    // });

    setIsGoAhead(true);

    if (isGoAhead) {
      if (portion % 4 !== 0) {
        const newPortion = portion + 1;
        setPortion(newPortion);
        localStorage.setItem("portion", newPortion.toString());
      } else {
        setIsExam(true);
        const newPortion = portion;
        setPortion(newPortion);
        localStorage.setItem("portion", newPortion.toString());
      }

      // const newPortionsHistory = [
      //   ...portionsHistory,
      //   {
      //     rightVerbs: Array.from(newRights),
      //     wrongVerbs: Array.from(newWrongs),
      //   },
      // ];

      //setPortionsHistory(newPortionsHistory);
      //localStorage.setItem("portionsHistory", JSON.stringify(newPortionsHistory));

      setIsChecking(false);
      setStage(1);
      localStorage.setItem("stage", "1");
    }
  };

  return (
    <>
      <h2>Режим пересказа</h2>
      <p className="task">Выучи текст, а затем перескажи его:</p>
      <div className="retail" style={{ height: `${areaHeight + 30}px` }}>
        {/* {isShowText && ( */}
        <p ref={ref} className={`text ${isShowText ? "show" : "hide"}`}>
          {verbs
            .filter((verb) => verb.examples.length > 0)
            .map((verb) => (
              <Span key={verb.id} verb={verb} isChecking={isChecking} textValue={textValue} />
            ))}
        </p>
        {/*  )} */}
        {isShowArea && (
          <textarea
            className="textarea"
            style={{ height: `${areaHeight + 4}px` }}
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            autoFocus
          ></textarea>
        )}
      </div>
      <div className="control">
        {!isShowArea ? (
          <button className="button" onClick={handleReady}>
            готов пересказывать
          </button>
        ) : (
          <>
            <button className="button" onClick={handleLook}>
              {isShowText ? "скрыть текст" : "подсмотреть текст"}
            </button>
            <button className="button" onClick={handleCheck}>
              {isGoAhead ? "далее" : "проверить пересказ"}
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Retelling;
