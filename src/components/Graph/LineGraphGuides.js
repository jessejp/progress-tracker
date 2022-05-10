import React from "react";
import css from "./Graph.module.css";
import SvgLine from "./SvgLine";

const LineGraphGuides = (props) => {
  const { graphGuides, graphPoints } = props;

  return (
    <svg>
      {graphGuides.sorted.map((line, index) => {
        const yCVal = graphGuides.yCoords[index];
        const excess = graphPoints.yCoords[0] / 2;
        const graphScale = 100 + excess;
        if (
          index < graphGuides.sorted.length - 1 &&
          graphGuides.sorted[index] !== graphGuides.sorted[index - 1]
        ) {
          return (
            <React.Fragment key={index}>
              <text
                y={`${graphScale - yCVal}%`}
                x="0"
                className={css.lineText}
                stroke="rgb(20, 40, 55, 10%)"
              >
                {line}
              </text>
              <SvgLine
                lineProperties={{
                  x1: 0,
                  y1: graphScale - yCVal,
                  x2: "100",
                  y2: graphScale - yCVal,
                  color: "rgb(20, 40, 55, 10%)",
                  id: null,
                }}
              />
            </React.Fragment>
          );
        }
        return "";
      })}
    </svg>
  );
};

export default LineGraphGuides;
