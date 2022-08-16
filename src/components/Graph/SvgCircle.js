import SvgLine from "./SvgLine";
import { colorPalette } from "../../functions/rpeStrings";
import "./SvgCircle.css";

const SvgCircle = (props) => {
  return (
    <>
      {props.lineProperties.x1 && props.lineProperties.y1 && (
        <SvgLine
          gradient={colorPalette}
          lineProperties={{
            ...props.lineProperties,
            x2: props.xCoordinate,
            y2: props.yCoordinate,
          }}
        />
      )}
      <circle
      tabIndex={0}
        id={props.indexID}
        onMouseEnter={(e) => {props.valueBoxHandler(e, props.reps, props.sets, props.rpe, props.pointValue, props.date, props.indexID)}}
        onFocus={(e) => {props.valueBoxHandler(e, props.reps, props.sets, props.rpe, props.pointValue, props.date, props.indexID)}}
        cx={`${props.xCoordinate}%`}
        cy={`${props.yCoordinate}%`}
        r="9"
        stroke="rgb(0, 0, 0, 20%)"
        strokeWidth="2"
        fill={colorPalette[props.rpe]}
      />
    </>
  );
};

export default SvgCircle;
