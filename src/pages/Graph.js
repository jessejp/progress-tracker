import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import css from "../components/Graph/Graph.module.css";
import GraphEntrySelection from "../components/Graph/GraphEntrySelection";
import SvgCircle from "../components/Graph/SvgCircle";
import SvgLine from "../components/Graph/SvgLine";
import useGraph from "../hooks/use-graph.js";

let isInitial = true;

const Graph = () => {
  const [graphPoints, setGraphPoints] = useState({
    unsorted: [],
    sorted: [],
    yCoords: [],
  });
  const [graphGuides, setGraphGuides] = useState({
    unsorted: [],
    sorted: [],
    yCoords: [],
  });

  const svgCalculateYLocation = useGraph();

  const dataState = useSelector((state) => state.graph.data);

  const initialSelection = dataState.length !== 0 ? dataState[0].name : "";
  const [selectedEntry, setSelectedEntry] = useState(initialSelection);

  const onSelectedEntry = (event) => {
    setSelectedEntry(event.target.value);
  };

  useEffect(() => {
    const selectedData = dataState.find((d) => d.name === selectedEntry);
    if (!isInitial && selectedData) {
      if (selectedData.mass) {
        setGraphPoints(svgCalculateYLocation(selectedData.mass));
      }
    } else {
      isInitial = false;
    }
  }, [svgCalculateYLocation, selectedEntry, dataState]);

  const { sorted } = graphPoints;

  useEffect(() => {
    if (sorted.length > 0) {
      const topValueFloor = Math.floor(sorted[sorted.length - 1] / 10) * 10;
      const graphGuidesArr = [
        Math.round(((topValueFloor / 4) * 2) / 10) * 10,
        Math.round(((topValueFloor / 4) * 3) / 10) * 10,
        Math.round(((topValueFloor / 4) * 4) / 10) * 10,
        Math.round(((topValueFloor / 4) * 5) / 10) * 10,
        sorted[sorted.length - 1],
      ];

      console.log(graphGuidesArr);
      setGraphGuides(svgCalculateYLocation(graphGuidesArr, false));
    }
  }, [svgCalculateYLocation, sorted]);

  console.log(graphPoints);
  console.log(graphGuides);

  return (
    <div className={css.graphContainer}>
      <div className={css.graphFlexContainer}>
        <GraphEntrySelection onSelectedEntry={onSelectedEntry} />
        <div>
          <form>
            <input type="radio" id="val1" name="data_type" value="Mass" />
            <label htmlFor="val1">Mass</label>

            <input type="radio" id="val2" name="data_type" value="Reps" />
            <label htmlFor="val2">Reps</label>

            <input type="radio" id="val3" name="data_type" value="Sets" />
            <label htmlFor="val3">Sets</label>
          </form>
        </div>
        <svg className={css.svgContainer} height="300" width="100%">
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
                  (sortedPoint) =>
                    sortedPoint === graphPoints.unsorted[index - 1]
                );
                lineProperties = {
                  x1: (index - 1) * 25 + 25,
                  y1: `${graphScale - graphPoints.yCoords[lastYIndex]}%`,
                  color: "rgb(120, 140, 255, 50%)",
                };
              }
              return (
                <SvgCircle
                  pointValue={point}
                  key={`${index}_svgcircle${Math.random}`}
                  indexID={index}
                  xCoordinate={index * 25 + 25}
                  yCoordinate={graphScale - graphPoints.yCoords[yIndex]}
                  lineProperties={lineProperties}
                />
              );
            })}
          </svg>
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
                        y1: `${graphScale - yCVal}%`,
                        color: "rgb(20, 40, 55, 10%)",
                      }}
                      x2="100%"
                      y2={`${graphScale - yCVal}%`}
                    />
                  </React.Fragment>
                );
              }
              return "";
            })}
          </svg>
        </svg>
      </div>
    </div>
  );
};

export default Graph;
