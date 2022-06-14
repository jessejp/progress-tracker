import React from "react";
import { useSelector } from "react-redux";
import BarGraph from "../components/Graph/BarGraph";
import css from "../components/Graph/Graph.module.css";
import LineGraph from "../components/Graph/LineGraph";

const Graph = () => {
  const dataState = useSelector((state) => state.graph.data);
  const category = dataState.findIndex((d) => d.category === "Weight Training");

  if (
    dataState.length > 0 &&
    category > -1 &&
    dataState[category].graphData.length
  ) {
    return (
      <div className={css.graphContainer}>
        <LineGraph dataState={dataState} category={category} />
        <BarGraph dataState={dataState} category={category} />
      </div>
    );
  } else {
    return (
      <div>
        <p>No Data.</p>
      </div>
    );
  }
};

export default Graph;
