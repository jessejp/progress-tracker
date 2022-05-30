import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Entries from "./pages/Entries";
import Graph from "./pages/Graph";
import Authenticate from "./pages/Authenticate";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getEntryData } from "./store/data-actions";
import { uiActions } from "./store/ui-slice";
import { getWeekNumber } from "./functions/getWeekNumber";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('init App')
    const initDate = new Date();
    dispatch(uiActions.initCurrentWeek({week: getWeekNumber(initDate)}));

    //dispatch(getEntryData());
  }, [dispatch, getWeekNumber, uiActions]);

  return (
    <div className="App">
      <div>
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
