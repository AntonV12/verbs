import { VerbType } from "../App";
import { useState, useRef } from "react";

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Retelling = ({ verbs }: { verbs: VerbType[] }) => {
  const [isShowArea, setIsShowArea] = useState<boolean>(false);
  const [isShowText, setIsShowText] = useState<boolean>(true);
  const randomInt = getRandomInt(0, verbs.length - 1);
  const [textValue, setTextValue] = useState<string>("");
  const [isAllRight, setIsAllRight] = useState<boolean | null>(null);
  const ref = useRef<HTMLParagraphElement>(null);

  const handleReady = () => {
    setIsShowArea(true);
    setIsShowText(false);
  };

  const handleLook = () => setIsShowText(!isShowText);

  const handleCheck = () => {
    setIsShowText(true);

    if (verbs[randomInt].translates.some((t) => textValue.includes(t))) {
      setIsAllRight(true);
    } else {
      if (ref.current) {
        ref.current.style.textDecoration = "red wavy underline";
      }
    }
  };

  const handleFocus = () => {
    if (ref.current) {
      ref.current.style.textDecoration = "none";
    }
  };

  return (
    <>
      <h2>Режим пересказа</h2>
      <p className="task">Выучи текст, а затем перескажи его:</p>
      <div className="retail">
        {isShowText && (
          <p className="text" ref={ref}>
            {verbs[randomInt].examples.join(". ")}
          </p>
        )}
        {isShowArea && (
          <textarea
            className="textarea"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            onFocus={handleFocus}
          ></textarea>
        )}
      </div>
      <div className="control">
        <button className="button" onClick={handleReady}>
          готов пересказывать
        </button>
        <button className="button" onClick={handleLook}>
          подсмотреть текст
        </button>
        <button className="button" onClick={handleCheck}>
          проверить пересказ
        </button>
      </div>
    </>
  );
};

export default Retelling;
