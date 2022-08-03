import React, { useState, useEffect } from "react";
import css from "./Graph.module.css";
import LineGraphGuides from "./LineGraphGuides";
import LineGraphPoints from "./LineGraphPoints";
import GraphEntrySelection from "./GraphEntrySelection";
import DetailText from "./PointDetailText";
import useGraph from "../../hooks/use-graph.js";

const LineGraph = (props) => {
  const { dataState, category } = props;

  const initialSelection = dataState[category].graphData[0].name;

  const [selectedEntry, setSelectedEntry] = useState(initialSelection);
  const [selectedData, setSelectedData] = useState();

  const onSelectedEntry = (event) => {
    setSelectedEntry(event.target.value);
  };

  const [repsData, setRepsData] = useState([]);
  const [setsData, setSetsData] = useState([]);
  const [rpeData, setRpeData] = useState([]);
  const [dateData, setDateData] = useState([]);

  const svgCalculateYLocation = useGraph();

  const [graphRange, setGraphRange] = useState(10);

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

  useEffect(() => {
    if (category > -1 && selectedEntry) {
      const newData = dataState[category].graphData.find(
        (d) => d.name === selectedEntry
      );

      setSelectedData(newData);

      if (newData) {
        if (newData.mass.length > 10) {
          setGraphRange(10 + newData.mass.length - 8);
        } else {
          setGraphRange(10);
        }
      }
    }
  }, [dataState, category, selectedEntry]);

  useEffect(() => {
    console.log("current graph Range:", graphRange);
    if (selectedData) {
      setGraphPoints(
        svgCalculateYLocation(
          selectedData.mass.slice(graphRange - 10, graphRange + 1)
        )
      );
      setRepsData(selectedData.reps.slice(graphRange - 10, graphRange + 1));
      setSetsData(selectedData.sets.slice(graphRange - 10, graphRange + 1));
      setRpeData(selectedData.rpe.slice(graphRange - 10, graphRange + 1));
      setDateData(selectedData.date.slice(graphRange - 10, graphRange + 1));
      console.log("selectedData Graph effect");
    }
  }, [dataState, selectedData, svgCalculateYLocation, graphRange]);

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

      setGraphGuides(svgCalculateYLocation(graphGuidesArr, false));
    }
  }, [svgCalculateYLocation, sorted]);

  const [showValue, setShowValue] = useState({
    mass: null,
    reps: null,
    sets: null,
    rpe: null,
    date: [0, 0, 0],
  });

  // Values to show in the text info
  const valueBoxHandler = (event, reps, sets, rpe, mass, date) => {
    if (event.type === "mouseenter") {
      setShowValue({ mass, reps, sets, rpe, date });
    }
  };

  const slideEntries = (direction) => {
    if (direction === "back" && graphRange > 10) {
      setGraphRange((state) => state - 1);
    } else if (
      direction === "forward" &&
      graphRange < graphRange + sorted.length - 1
    ) {
      setGraphRange((state) => state + 1);
    }
  };

  return (
    <div className={css.graphFlexContainer}>
      <GraphEntrySelection onSelectedEntry={onSelectedEntry} />
      <div className={css.graphTextContainer}>
        {showValue.rpe !== null && showValue.mass !== null && (
          <DetailText showValue={showValue} />
        )}
      </div>

      <svg className={css.svgContainer} height="300" width="100%">
        <LineGraphGuides graphGuides={graphGuides} graphPoints={graphPoints} />
        <LineGraphPoints
          graphPoints={graphPoints}
          repsData={repsData}
          setsData={setsData}
          rpeData={rpeData}
          dateData={dateData}
          valueBoxHandler={valueBoxHandler}
        />
      </svg>

      {dateData.length > 0 && (
        <div className={css.graphDateRange}>
          <div className={css.graphDateRangeItem}>
            <div>
              {dateData[0].day}.{dateData[0].month}
            </div>

            <button
              className="generic"
              onClick={() => {
                slideEntries("back");
              }}
            >
              back
            </button>
          </div>
          <div>
            {dateData[0].year !== dateData[dateData.length - 1].year
              ? `${dateData[0].year} - ${dateData[dateData.length - 1].year}`
              : dateData[0].year}
          </div>
          <div className={css.graphDateRangeItem}>
            <div>
              {dateData[dateData.length - 1].day}.
              {dateData[dateData.length - 1].month}
            </div>
            <button
              className="generic"
              onClick={() => {
                slideEntries("forward");
              }}
            >
              forward
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LineGraph;
