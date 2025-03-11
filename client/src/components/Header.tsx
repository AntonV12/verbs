import { StyledHeader, Logo, H1, About, Start } from "./styles";

const Header = ({
  isStarted,
  setIsStarted,
  setStage,
  verbsLength,
  setPortion,
}: {
  isStarted: boolean;
  setIsStarted: React.Dispatch<React.SetStateAction<boolean>>;
  setStage: React.Dispatch<React.SetStateAction<number>>;
  verbsLength: number;
  setPortion: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const handleStart = () => {
    setIsStarted(true);
    localStorage.setItem("isStarted", "true");
    setStage(1);
    localStorage.setItem("stage", "1");
    setPortion(1);
    localStorage.setItem("portion", "1");
  };

  return (
    <StyledHeader>
      <Logo>
        <img src="/logo.svg" width="70" height="70" alt="logo" />
        <span className="host">{window.location.hostname}</span>
      </Logo>

      <H1>Английские фразовые глаголы</H1>

      {!isStarted && (
        <div className="first">
          <About>
            На нашем сайте вы сможете выучить английские глаголы с предлогами, меняющими их значение.
            <br />
            {verbsLength > 0 && `Всего глаголов: ${verbsLength}.`}
          </About>
          <Start onClick={handleStart}>начать изучение</Start>
        </div>
      )}
    </StyledHeader>
  );
};

export default Header;
