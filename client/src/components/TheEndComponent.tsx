import { TheEnd, Start } from "./styles";

const TheEndComponent = ({
  setPortion,
  setIsStarted,
  setIsExam,
}: {
  setPortion: React.Dispatch<React.SetStateAction<number>>;
  setIsStarted: React.Dispatch<React.SetStateAction<boolean>>;
  setIsExam: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleClear = () => {
    localStorage.clear();
    setIsExam(false);
    setPortion(1);
    setIsStarted(false);
  };

  return (
    <TheEnd>
      <h2>Поздравляю, ты выучил все слова</h2>
      <Start onClick={handleClear}>начать заново</Start>
    </TheEnd>
  );
};

export default TheEndComponent;
