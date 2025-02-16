import { StyledProcess } from "./styles";

const Process = ({ portion, lastVerb, isStarted }: { portion: number; lastVerb: number; isStarted: boolean }) => {
  const currentPortion = portion + 1;

  if (portion % 5 !== 0 || isStarted) {
    return (
      <>
        <StyledProcess>
          <span>{currentPortion}</span> / <span>{lastVerb}</span>
        </StyledProcess>
      </>
    );
  }
};

export default Process;
