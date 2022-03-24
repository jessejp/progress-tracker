import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import css from "./Graph.module.css";
import SvgCircle from "./SvgCircle";

/* const DUMMY_DATA = [
  {
    name: "Bench Press",
    mass: [20, 22, 18, 42, 18, 24, 33, 55, 12],
    reps: [15, 8, 12],
    sets: [4, 3, 3],
  },
]; */

let isInitial = true;

const Graph = () => {
  // [unsorted], [sorted], [yCoordinates]
  const [graphPoints, setGraphPoints] = useState({
    unsorted: [],
    sorted: [],
    yCoords: [],
  });

  const [selectedEntry, setSelectedEntry] = useState("Bench");

  const dataState = useSelector((state) => state.graph.data);

  const svgBulletLocation = useCallback((sortableArr) => {
    let sortedArr = [...sortableArr];
    sortedArr.sort(function (a, b) {
      return a - b;
    });
    let yDivided = [];

    for (let i = 1; i <= sortedArr.length; i++) {
      if (sortedArr[i - 2] === sortedArr[i - 1]) {
        yDivided.push(yDivided[yDivided.length - 1]);
      } else {
        yDivided.push(Math.round(100 / sortedArr.length) * i);
      }
    }
    return {
      unsorted: sortableArr,
      sorted: sortedArr,
      yCoords: yDivided,
    };
  }, []);

  useEffect(() => {
    const selectedData = dataState.find((d) => d.name === selectedEntry);
    if (!isInitial) {
      if (selectedData.mass) {
        setGraphPoints(svgBulletLocation(selectedData.mass));
      }
    }
    isInitial = false;
    console.log(selectedData);
  }, [svgBulletLocation, selectedEntry, dataState]);
  console.log(graphPoints);
  return (
    <div className={css.graphContainer}>
      <svg className={css.svgContainer} height="300" width="90%">
        {graphPoints.unsorted.map((point, index) => {
          const y = graphPoints.sorted.findIndex(
            (sortedPoint) => sortedPoint === point
          );
          //every other circle should create a line
          let lineProperties = {};
          if (index !== 0) {
            const lastY = graphPoints.sorted.findIndex(
              (sortedPoint) => sortedPoint === graphPoints.unsorted[index - 1]
            );
            lineProperties = {
              x1: (index - 1) * 30 + 15,
              y1: 100 - graphPoints.yCoords[lastY],
            };
          }
          return (
            <SvgCircle
              key={index}
              xCoordinate={index * 30 + 15}
              yCoordinate={100 - graphPoints.yCoords[y]}
              lineProperties={lineProperties}
            />
          );
        })}
        {/* <circle
          cx="20"
          cy="290"
          r="10"
          stroke="black"
          strokeWidth="1"
          fill="red"
        />
        <circle
          cx="10"
          cy="240"
          r="10"
          stroke="black"
          strokeWidth="1"
          fill="red"
        />
        <line
          x1="10"
          y1="240"
          x2="20"
          y2="290"
          style={{ stroke: "rgb(255,0,0)", strokeWidth: "2" }}
        /> */}
      </svg>
    </div>
  );
};

export default Graph;
