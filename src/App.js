import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Entries from "./pages/Entries";
import Graph from "./pages/Graph";
import Authenticate from "./pages/Authenticate";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getEntryData,
  getGraphData,
  sendEntryData,
  sendGraphData,
} from "./store/data-actions";
import { uiActions } from "./store/ui-slice";
import { getWeekNumber } from "./functions/getWeekNumber";
import { authStateObserver } from "./store/auth-actions";

function App() {
  const uiState = useSelector((state) => state.ui);
  const userDataLoaded = useSelector((state) => state.auth);
  const entriesState = useSelector((state) => state.entries.entries);
  const graphState = useSelector((state) => state.graph.data);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("init App");
    const initDate = new Date();
    dispatch(uiActions.initCurrentWeek({ week: getWeekNumber(initDate) }));

    dispatch(authStateObserver());
  }, [dispatch]);

  const { entriesInitialized, graphDataInitialized } = userDataLoaded.dataInitialized;

  useEffect(() => {
    console.log(userDataLoaded);
    let loadingDataTimer = setTimeout(() => {
      if (userDataLoaded.isLoggedIn) {
        if (!userDataLoaded.dataFound.entriesFound && !entriesInitialized) {
          dispatch(getEntryData());
        }
        if (!userDataLoaded.dataFound.graphDataFound && !graphDataInitialized) {
          dispatch(getGraphData());
        }
      }
    }, 500);

    return () => {
      clearTimeout(loadingDataTimer);
    };
  }, [userDataLoaded, dispatch, entriesInitialized, graphDataInitialized]);

  const { unsavedEntries, unsavedGraph } = uiState.unsavedData;
  const { entriesFound, graphDataFound } = userDataLoaded.dataFound;

  useEffect(() => {
    let saveEntriesTimer = setTimeout(() => {
      if (unsavedEntries) {
        dispatch(sendEntryData(entriesState, entriesFound));
      }
    }, 4000);

    return () => {
      clearTimeout(saveEntriesTimer);
    };
  }, [dispatch, unsavedEntries, entriesState, entriesFound]);

  useEffect(() => {
    let saveGraphTimer = setTimeout(() => {
      if (unsavedGraph) {
        dispatch(sendGraphData(graphState, graphDataFound));
      }
    }, 4000);

    return () => {
      clearTimeout(saveGraphTimer);
    };
  }, [dispatch, unsavedGraph, graphState, graphDataFound]);

  return (
    <div className="App">
      <div>
        {/* unsavedEntries || unsavedGraph ? 'loading...' : ' ' */}
        <Header />
        <Routes>
          <Route path="/" element={<Navigate replace to="/entries" />} />
          <Route path="/entries/*" element={<Entries />} />
          <Route path="/graphs" element={<Graph />} />
          <Route path="/authenticate/*" element={<Authenticate />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
