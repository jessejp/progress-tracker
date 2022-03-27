const SvgLine = (props) => {
  return (
    <line
      x1={props.lineProperties.x1}
      y1={props.lineProperties.y1}
      x2={props.x2}
      y2={props.y2}
      style={{
        stroke: props.lineProperties.color,
        strokeWidth: "2",
      }}
    />
  );
};

export default SvgLine;
