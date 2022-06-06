import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BarGraph from "../components/Graph/BarGraph";
import css from "../components/Graph/Graph.module.css";
import LineGraph from "../components/Graph/LineGraph";
import { getGraphData } from "../store/data-actions";
import { uiActions } from "../store/ui-slice";

const Graph = () => {
  const dataState = useSelector((state) => state.graph.data);
  const uiState = useSelector((state) => state.ui);
  const category = dataState.findIndex((d) => d.category === "Weight Training");
  const dispatch = useDispatch();

  const { graphLoaded } = uiState;

  useEffect(() => {
    console.log("Graph effect", graphLoaded);
    if (!graphLoaded) {
      //dispatch(getGraphData());
    }
  }, [dispatch, graphLoaded]);

  /* useEffect(() => {
    console.log("graph effect");
    let loadGraphDataTimer = setTimeout(() => {
      if (!isInitial) {
        console.log("graphData: effect, sendGraphData", dataState);
        dispatch(sendGraphData(dataState));
      }
    }, 1000);

    return () => {
      isInitial = false;
      clearTimeout(loadGraphDataTimer);
    };
  }, [dataState, dispatch]); */
  if (dataState.length > 0 && category > -1 && dataState[category].graphData.length) {
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
