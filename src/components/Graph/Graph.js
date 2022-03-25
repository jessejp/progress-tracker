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

  const dataState = useSelector((state) => state.graph.data);

  const [selectedEntry, setSelectedEntry] = useState(
    dataState.length !== 0 ? dataState[0].name : ""
  );

  const svgBulletLocation = useCallback((sortableArr) => {
    let sortedArr = [...sortableArr];
    sortedArr.sort(function (a, b) {
      return a - b;
    });

    let yCoords = [];
    let lastCenter = null;

    for (let i = 0; i < sortedArr.length; i++) {
      const center = sortedArr[Math.round(sortedArr.length / 2)];
      const centerIndex = sortedArr.findIndex((a) => a === center);

      const wholeIndex = i + 1;
      const wholeCenterIndex = centerIndex + 1;

      if (sortedArr[i] === center) {
        yCoords.push(50);

        if (sortedArr[i + 1] !== center) lastCenter = i;
      } else if (i < centerIndex) {
        yCoords.push(Math.round(50 / wholeCenterIndex) * wholeIndex);
      } else if (i > centerIndex) {
        const indexLeft = sortedArr.length - lastCenter;
        yCoords.push(Math.round(50 / indexLeft) * wholeIndex);
      }
    }

    const balanceArray = yCoords.map((y) => (y * (y / 100)) / 2 + 2);

    return {
      unsorted: sortableArr,
      sorted: sortedArr,
      yCoords: balanceArray,
    };
  }, []);

  const onSelectedEntry = (event) => {
    setSelectedEntry(event.target.value);
  };

  useEffect(() => {
    const selectedData = dataState.find((d) => d.name === selectedEntry);
    if (!isInitial && selectedData) {
      if (selectedData.mass) {
        setGraphPoints(svgBulletLocation(selectedData.mass));
      }
    } else {
      isInitial = false;
    }
  }, [svgBulletLocation, selectedEntry, dataState]);

  console.log(graphPoints);

  return (
    <div className={css.graphContainer}>
      <div className={css.graphFlexContainer}>
        {selectedEntry && (
          <form className={css.entryForm} onChange={onSelectedEntry}>
            <label htmlFor="entrySelection">Choose an exercise:</label>
            <select name="entrySelection">
              {dataState.map((entry) => {
                return (
                  <option key={entry.name} value={entry.name}>
                    {entry.name}
                  </option>
                );
              })}
            </select>
          </form>
        )}
        <svg className={css.svgContainer} height="300" width="90%">
          {graphPoints.unsorted.map((point, index) => {
            const yIndex = graphPoints.sorted.findIndex(
              (sortedPoint) => sortedPoint === point
            );
            //every other circle creates a line
            let lineProperties = {};
            if (index !== 0) {
              const lastYIndex = graphPoints.sorted.findIndex(
                (sortedPoint) => sortedPoint === graphPoints.unsorted[index - 1]
              );
              lineProperties = {
                x1: (index - 1) * 30 + 15,
                y1: `${100 - graphPoints.yCoords[lastYIndex]}%`,
              };
            }
            return (
              <SvgCircle
                pointValue={point}
                key={index}
                indexID={index}
                xCoordinate={index * 30 + 15}
                yCoordinate={100 - graphPoints.yCoords[yIndex]}
                lineProperties={lineProperties}
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default Graph;
