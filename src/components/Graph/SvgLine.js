const SvgLine = (props) => {
  const { gradientColor1, gradientColor2 } = props.lineProperties;
  return (
    <>
      {props.lineProperties.id && (
        <defs>
          <linearGradient
            id={props.lineProperties.id}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor={props.gradient[gradientColor1]} />
            <stop offset="100%" stopColor={props.gradient[gradientColor2]} />
          </linearGradient>
        </defs>
      )}
      <line
        x1={props.lineProperties.x1}
        y1={`${props.lineProperties.y1}%`}
        x2={props.lineProperties.x2}
        y2={
          props.lineProperties.y2 === props.lineProperties.y1
            ? `${props.lineProperties.y2 + 0.001}%`
            : `${props.lineProperties.y2}%`
        }
        style={{
          stroke: props.lineProperties.color,
          strokeWidth: "3",
        }}
      />
    </>
  );
};

export default SvgLine;
