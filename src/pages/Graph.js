import React from "react";
import { useSelector } from "react-redux";
import BarGraph from "../components/Graph/BarGraph";
import css from "../components/Graph/Graph.module.css";
import LineGraph from "../components/Graph/LineGraph";

const Graph = () => {
  const dataState = useSelector((state) => state.graph.data);
  const category = dataState.findIndex((d) => d.category === "Weight Training");

    return (
      <div className={css.graphContainer}>
        <LineGraph dataState={dataState} category={category} />
        <BarGraph dataState={dataState} category={category} />
      </div>
    );
};

export default Graph;
