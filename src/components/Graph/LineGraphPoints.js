import React from "react";
import SvgCircle from "./SvgCircle";

const LineGraphPoints = (props) => {
  const { graphPoints, repsData, setsData, rpeData, dateData, valueBoxHandler } = props;

  return (
    <svg>
      {graphPoints.unsorted.map((point, index) => {
        const yIndex = graphPoints.sorted.findIndex(
          (sortedPoint) => sortedPoint === point
        );
        const excess = graphPoints.yCoords[0] / 2;
        const graphScale = 100 + excess;
        //every other circle creates a line
        let lineProperties = {};
        if (index !== 0) {
          const lastYIndex = graphPoints.sorted.findIndex(
            (sortedPoint) => sortedPoint === graphPoints.unsorted[index - 1]
          );
          lineProperties = {
            x1: (index - 1) * 10 + 5,
            y1: graphScale - graphPoints.yCoords[lastYIndex],
            color: `url(#linear${index})`,
            id: `linear${index}`,
            gradientColor1: rpeData[index - 1],
            gradientColor2: rpeData[index],
          };
        }
        return (
          <SvgCircle
            pointValue={point}
            key={`${index}_svgcircle${Math.random}`}
            indexID={index}
            xCoordinate={index * 10 + 5}
            yCoordinate={graphScale - graphPoints.yCoords[yIndex]}
            lineProperties={lineProperties}
            reps={repsData[index]}
            sets={setsData[index]}
            rpe={rpeData[index]}
            date={dateData[index]}
            valueBoxHandler={valueBoxHandler}
          />
        );
      })}
    </svg>
  );
};

export default LineGraphPoints;
