import { StyledHeader, Logo, H1, About, Start } from "./styles";

const Header = ({
  isStarted,
  setIsStarted,
  setStage,
}: {
  isStarted: boolean;
  setIsStarted: React.Dispatch<React.SetStateAction<boolean>>;
  setStage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const handleStart = () => {
    setIsStarted(true);
    localStorage.setItem("isStarted", "true");
    setStage(1);
    localStorage.setItem("stage", "1");
  };

  return (
    <StyledHeader>
      <Logo>
        <img src="/logo.svg" width="70" height="70" alt="logo" />
        <span className="host">verbs.prx.by</span>
      </Logo>

      <H1>Английские фразовые глаголы</H1>

      {!isStarted && (
        <div className="first">
          <About>На нашем сайте вы сможете выучить английские глаголы с предлогами, меняющими их значение.</About>
          <Start onClick={handleStart}>начать изучение</Start>
        </div>
      )}
    </StyledHeader>
  );
};

export default Header;
