import { Alert, Button } from "./styles";
import { useEffect } from "react";

const AlertComponent = ({ setShowAlert }: { setShowAlert: React.Dispatch<React.SetStateAction<boolean>> }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  });

  return (
    <Alert>
      <div>
        <p>Контрольная работа. Выдаются слова за последние 5 порций</p>
        <Button onClick={() => setShowAlert(false)}>понятно</Button>
      </div>
    </Alert>
  );
};

export default AlertComponent;
