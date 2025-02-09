const Process = ({ portion }: { portion: number }) => {
  return (
    <div className="process">
      порция <span>{portion + 1}</span> из <span>40</span>
    </div>
  );
};

export default Process;
