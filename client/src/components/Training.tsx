import { VerbType } from "../App";
import React, { useState, useEffect } from "react";

function arraysMatch(arr1: string[], arr2: string[]): boolean {
  return arr1.every((word) =>
    arr2.some((str) =>
      str
        .split(", ")
        .map((s) => s.trim())
        .includes(word)
    )
  );
}

const Cell = ({ mode, verb, firstElemId }: { mode: "en" | "ru"; verb: VerbType; firstElemId: number }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.removeProperty("background-color");
    e.target.style.removeProperty("border");
    e.target.dataset.correct = "";
  };

  useEffect(() => {
    setInputValue("");
  }, [mode]);

  return (
    <>
      <tr>
        {mode === "en" ? (
          <>
            <td>
              <input
                type="text"
                className={mode}
                value={inputValue}
                onChange={onInputChange}
                onFocus={handleFocus}
                autoFocus={firstElemId === verb.id}
              />
            </td>
            <td>{verb.translates.join(", ")}</td>
          </>
        ) : (
          <>
            <td>{verb.verb}</td>
            <td>
              <input
                type="text"
                className={mode ? mode : ""}
                value={inputValue}
                onChange={onInputChange}
                onFocus={handleFocus}
                autoFocus={firstElemId === verb.id}
              />
            </td>
          </>
        )}
      </tr>
    </>
  );
};

const ControlButton = ({
  handleCheck,
  verbs,
  mode,
  isAllRight,
  setIsAllRight,
  setMode,
  setStage,
  wrongVerbs,
  setWordsList,
  initialWordsList,
  setMessage,
  setCorrectVerbs,
}: {
  handleCheck: (verbs: VerbType[], mode: "en" | "ru") => void;
  verbs: VerbType[];
  mode: "en" | "ru";
  isAllRight: boolean;
  setIsAllRight: React.Dispatch<React.SetStateAction<boolean>>;
  setMode: React.Dispatch<React.SetStateAction<"en" | "ru">>;
  setStage: React.Dispatch<React.SetStateAction<number>>;
  wrongVerbs: VerbType[];
  setWordsList: React.Dispatch<React.SetStateAction<VerbType[]>>;
  initialWordsList: VerbType[];
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setCorrectVerbs: React.Dispatch<React.SetStateAction<number[]>>;
}) => {
  const [isGoAhead, setIsGoAhead] = useState<boolean>(false);
  const [wrongWord, setWrongWord] = useState<string>("");

  useEffect(() => {
    if (isGoAhead) {
      if (!isAllRight) {
        if (wrongVerbs.length === 1) {
          setWrongWord("глагол");
        } else if (wrongVerbs.length > 1 && wrongVerbs.length < 5) {
          setWrongWord("глагола");
        } else {
          setWrongWord("глаголов");
        }
        setMessage(`Необходимо доучить ещё ${wrongVerbs.length} ${wrongWord}`);
      }
    }
  }, [wrongVerbs, isAllRight, isGoAhead, setMessage, wrongWord]);

  const handleClick = () => {
    setIsGoAhead(true);

    if (!isGoAhead) {
      handleCheck(verbs, mode);
    }

    if (isGoAhead) {
      if (mode === "en") {
        if (isAllRight) {
          setIsAllRight(false);
          localStorage.setItem("correctVerbs", JSON.stringify([]));
          setWordsList(initialWordsList);
          setCorrectVerbs([]);
          setMode("ru");
          localStorage.setItem("mode", "ru");
        } else {
          setStage(1);
          localStorage.setItem("stage", "1");
          setWordsList(wrongVerbs);
        }
      } else {
        if (isAllRight) {
          setIsAllRight(false);
          localStorage.setItem("stage", "3");
          setMode("en");
          setWordsList(initialWordsList);
          setCorrectVerbs([]);
          localStorage.setItem("mode", "en");
          localStorage.setItem("correctVerbs", JSON.stringify([]));
          setStage(3);
        } else {
          setStage(1);
          localStorage.setItem("stage", "1");
          setWordsList(wrongVerbs);
        }
      }
      setIsGoAhead(false);
      setMessage("");
    }
  };

  return (
    <button className="button" onClick={handleClick}>
      {isGoAhead ? "далее" : "проверить ввод слов"}
    </button>
  );
};

const Training = ({
  verbs,
  setStage,
  setWordsList,
  initialWordsList,
  setCorrectVerbs,
}: {
  verbs: VerbType[];
  setStage: React.Dispatch<React.SetStateAction<number>>;
  setWordsList: React.Dispatch<React.SetStateAction<VerbType[]>>;
  initialWordsList: VerbType[];
  setCorrectVerbs: React.Dispatch<React.SetStateAction<number[]>>;
}) => {
  const [mode, setMode] = useState<"en" | "ru">((localStorage.getItem("mode") as "en" | "ru") || "en");
  const [isAllRight, setIsAllRight] = useState<boolean>(false);
  const firstElemId = verbs[0].id;
  const [wrongVerbs, setWrongVerbs] = useState<VerbType[]>([]);
  const [message, setMessage] = useState<string>("");

  const handleCheck = (verbs: VerbType[], mode: "en" | "ru") => {
    const inputs: HTMLInputElement[] = Array.from(document.querySelectorAll("input[type='text']"));

    inputs.forEach((input, index) => {
      const value: string = input.value.toLowerCase().trim();

      if (mode === "en") {
        if (value === verbs[index].verb) {
          input.style.border = "2px solid rgb(51, 185, 2)";
          input.style.backgroundColor = "rgba(51, 185, 2, 0.05)";
          input.dataset.correct = "true";
        } else {
          input.style.border = "2px solid red";
          input.style.backgroundColor = "rgba(252, 86, 86, 0.05)";
        }
      } else {
        if (arraysMatch(value.split(", "), verbs[index].translates)) {
          input.style.border = "2px solid rgb(51, 185, 2)";
          input.style.backgroundColor = "rgba(51, 185, 2, 0.05)";
          input.dataset.correct = "true";
        } else {
          input.style.border = "2px solid red";
          input.style.backgroundColor = "rgba(252, 86, 86, 0.05)";
        }
      }
    });

    if (inputs.every((input) => input.dataset.correct === "true")) {
      setIsAllRight(true);
    } else {
      const wrongInputs: HTMLInputElement[] = inputs.filter((input) => input.dataset.correct !== "true");
      const newWordsList: VerbType[] = wrongInputs.map((input) => {
        const verb = verbs[inputs.indexOf(input)];
        return {
          verb: verb.verb,
          translates: verb.translates,
          id: verb.id,
          examples: verb.examples,
        };
      });

      const correctWordsIds: number[] = verbs
        .filter((verb) => !newWordsList.some((word) => word.id === verb.id))
        .map((verb) => verb.id);
      const savedCorrectVerbs = localStorage.getItem("correctVerbs");
      if (savedCorrectVerbs) {
        const parsedCorrectVerbs = JSON.parse(savedCorrectVerbs) as number[];
        correctWordsIds.push(...parsedCorrectVerbs);
      }
      localStorage.setItem("correctVerbs", JSON.stringify(correctWordsIds));
      setWrongVerbs(newWordsList);
    }
  };

  return (
    <>
      <h2>Режим тренировки: {mode === "en" ? "1" : "2"}</h2>
      <p className="task">Впиши слова по памяти в появившиеся поля:</p>

      <table className="table">
        <tbody>
          {verbs.map((verb) => {
            return <Cell key={verb.id} mode={mode} verb={verb} firstElemId={firstElemId} />;
          })}
        </tbody>
      </table>
      <p className={`message ${message ? "visible" : ""}`} style={{ color: isAllRight ? "#28a745" : "red" }}>
        <strong>{message}</strong>
      </p>
      <div className="control">
        <ControlButton
          handleCheck={handleCheck}
          verbs={verbs}
          mode={mode}
          isAllRight={isAllRight}
          setIsAllRight={setIsAllRight}
          setMode={setMode}
          setStage={setStage}
          wrongVerbs={wrongVerbs}
          setWordsList={setWordsList}
          initialWordsList={initialWordsList}
          setMessage={setMessage}
          setCorrectVerbs={setCorrectVerbs}
        />
      </div>
    </>
  );
};

export default Training;
