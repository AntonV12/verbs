import { VerbType } from "../App";
import { useState, useEffect } from "react";

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

const Cell = ({ mode, verb }: { mode: "en" | "ru"; verb: VerbType }) => {
  const [inputValue, setInputValue] = useState<string>("");
  //const ref = useRef(null);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.removeProperty("background-color");
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
              <input type="text" className={mode} value={inputValue} onChange={onInputChange} onFocus={handleFocus} />
            </td>
            <td>{verb.translates.join(", ")}</td>
          </>
        ) : (
          <>
            <td>{verb.verb}</td>
            <td>
              <input type="text" className={mode} value={inputValue} onChange={onInputChange} onFocus={handleFocus} />
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
}: {
  handleCheck: (verbs: VerbType[], mode: "en" | "ru") => void;
  verbs: VerbType[];
  mode: "en" | "ru";
  isAllRight: boolean;
  setIsAllRight: React.Dispatch<React.SetStateAction<boolean>>;
  setMode: React.Dispatch<React.SetStateAction<"en" | "ru">>;
  setStage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const handleClick = () => {
    handleCheck(verbs, mode);

    if (mode === "en") {
      if (isAllRight) {
        setIsAllRight(false);
        setMode("ru");
      }
    } else {
      if (isAllRight) {
        setIsAllRight(false);
        setStage(3);
        localStorage.setItem("stage", String(3));
      }
    }
  };

  return (
    <button className="button" onClick={handleClick}>
      {isAllRight ? "верно, далее" : "проверить ввод слов"}
    </button>
  );
};

const Training = ({
  verbs,
  setStage,
}: {
  verbs: VerbType[];
  setStage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [mode, setMode] = useState<"en" | "ru">("en");
  const [isAllRight, setIsAllRight] = useState<boolean>(false);

  const handleCheck = (verbs: VerbType[], mode: "en" | "ru") => {
    const inputs: HTMLInputElement[] = Array.from(document.querySelectorAll("input[type='text']"));

    inputs.forEach((input, index) => {
      const value: string = input.value.toLowerCase().trim();

      if (mode === "en") {
        if (value === verbs[index].verb) {
          input.style.backgroundColor = "green";
        } else {
          input.style.backgroundColor = "red";
        }
      } else {
        if (arraysMatch(value.split(", "), verbs[index].translates)) {
          input.style.backgroundColor = "green";
        } else {
          input.style.backgroundColor = "red";
        }
      }
    });

    if (inputs.every((input) => input.style.backgroundColor === "green")) {
      setIsAllRight(true);
    }
  };

  return (
    <>
      <h2>Режим тренировки: {mode === "en" ? "1" : "2"}</h2>
      <p className="task">Впиши слова по памяти в появившиеся поля:</p>

      <table className="table">
        <tbody>
          {verbs.map((verb) => {
            return <Cell key={verb.id} mode={mode} verb={verb} />;
          })}
        </tbody>
      </table>
      <div className="control">
        <ControlButton
          handleCheck={handleCheck}
          verbs={verbs}
          mode={mode}
          isAllRight={isAllRight}
          setIsAllRight={setIsAllRight}
          setMode={setMode}
          setStage={setStage}
        />
      </div>
    </>
  );
};

export default Training;
