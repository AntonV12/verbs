import { Tooltip } from "./styles";

const TooltipComponent = ({ text }: { text: string }) => {
  return (
    <Tooltip className="tooltip">
      <span>{text}</span>
      <div className="tooltip-arrow"></div>
    </Tooltip>
  );
};

export default TooltipComponent;
