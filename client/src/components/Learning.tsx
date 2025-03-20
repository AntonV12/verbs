import { VerbType } from "../App";

const Learning = ({
  verbs,
  setStage,
}: {
  verbs: VerbType[];
  portion: number;
  stage: number;
  setStage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const handleNext = () => {
    setStage(2);
    localStorage.setItem("stage", String(2));
  };

  return (
    <>
      <h2>Режим заучивания</h2>
      <p className="task">Выучи следующие слова:</p>
      <table className="table" style={{ marginBottom: "26px" }}>
        <tbody>
          {verbs.map((verb) => {
            return (
              <tr key={verb.id}>
                <td>{verb.verb}</td>
                <td>{verb.translates.join(", ")}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="control">
        <button className="button" onClick={handleNext}>
          перейти к тренировке
        </button>
      </div>
    </>
  );
};

export default Learning;
