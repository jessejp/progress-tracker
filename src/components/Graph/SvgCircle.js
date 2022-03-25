const SvgCircle = (props) => {
  return (
    <>
      <circle
        id={props.indexID}
        onMouseEnter={props.onHoverCircle}
        cx={props.xCoordinate}
        cy={props.yCoordinate}
        r="6"
        stroke="black"
        strokeWidth="1"
        fill="#788cff"
      />
      {props.lineProperties.x1 && props.lineProperties.y1 && (
        <line
          x1={props.lineProperties.x1}
          y1={props.lineProperties.y1}
          x2={props.xCoordinate}
          y2={props.yCoordinate}
          style={{ stroke: "#788cff", strokeWidth: "2" }}
        />
      )}
    </>
  );
};

export default SvgCircle;
