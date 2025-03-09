import { StyledProcess } from "./styles";

const Process = ({ portion, lastVerb }: { portion: number; lastVerb: number }) => {
  return (
    <>
      <StyledProcess>
        <span>{portion <= lastVerb ? portion : lastVerb}</span> / <span>{lastVerb}</span>
      </StyledProcess>
    </>
  );
};

export default Process;
