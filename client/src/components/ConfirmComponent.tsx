import { Confirm, Button } from "./styles";
import { useEffect } from "react";

const ConfirmComponent = ({
  fn,
  setShowConfirm,
}: {
  fn: () => unknown;
  setShowConfirm: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  });

  const handleConfirm = () => {
    fn();
    setShowConfirm(false);
  };

  return (
    <Confirm>
      <div className="confirm">
        <p>Весь прогресс будет сброшен. Вы уверены?</p>
        <div>
          <Button onClick={handleConfirm}>Да</Button>
          <Button onClick={() => setShowConfirm(false)}>Нет</Button>
        </div>
      </div>
    </Confirm>
  );
};

export default ConfirmComponent;
