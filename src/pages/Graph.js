import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import css from "../components/Graph/Graph.module.css";
import GraphEntrySelection from "../components/Graph/GraphEntrySelection";
import SvgCircle from "../components/Graph/SvgCircle";
import SvgLine from "../components/Graph/SvgLine";
import useGraph from "../hooks/use-graph.js";

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

  const [rpeData, setRpeData] = useState([]);

  const svgCalculateYLocation = useGraph();

  const dataState = useSelector((state) => state.graph.data);

  const [category, setCategory] = useState(
    dataState.findIndex((d) => d.category === "Weight Lifting")
  );

  const initialSelection =
    category > -1 ? dataState[category].graphData[0].name : "";

  const [selectedEntry, setSelectedEntry] = useState(initialSelection);

  const onSelectedEntry = (event) => {
    setSelectedEntry(event.target.value);
  };

  useEffect(() => {
    if (category > -1) {
      const selectedData = dataState[category].graphData.find(
        (d) => d.name === selectedEntry
      );

      if (selectedData) {
        if (selectedData.mass) {
          setGraphPoints(svgCalculateYLocation(selectedData.mass));
        }
        setRpeData(selectedData.rpe);
      }
    }
  }, [svgCalculateYLocation, selectedEntry, dataState, category]);

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

  console.log("points", graphPoints);
  console.log("guides", graphGuides);

  return (
    <div className={css.graphContainer}>
      <div className={css.graphFlexContainer}>
        <GraphEntrySelection onSelectedEntry={onSelectedEntry} />
        <svg className={css.svgContainer} height="300" width="100%">
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
                        x2: "100%",
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
                  xCoordinate={index * 25 + 25}
                  yCoordinate={graphScale - graphPoints.yCoords[yIndex]}
                  lineProperties={lineProperties}
                  rpe={rpeData[index]}
                />
              );
            })}
          </svg>
        </svg>
      </div>
    </div>
  );
};

export default Graph;
