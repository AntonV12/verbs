import { TheEnd, Start } from "./styles";

const TheEndComponent = () => {
  const handleClear = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <TheEnd>
      <h2>Поздравляю, ты выучил все слова</h2>
      <Start onClick={handleClear}>начать заново</Start>
    </TheEnd>
  );
};

export default TheEndComponent;
