import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Entries from "./pages/Entries";
import Graph from "./pages/Graph";
import Authenticate from "./pages/Authenticate";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getEntryData, sendEntryData } from "./store/data-actions";
import { uiActions } from "./store/ui-slice";
import { getWeekNumber } from "./functions/getWeekNumber";
import { authStateObserver } from "./store/auth-actions";

function App() {
  const dispatch = useDispatch();

  const fsg = () => {
    dispatch(getEntryData());
  };

  useEffect(() => {
    console.log("init App");
    const initDate = new Date();
    dispatch(uiActions.initCurrentWeek({ week: getWeekNumber(initDate) }));

    dispatch(authStateObserver());

  }, [dispatch]);

  return (
    <div className="App">
      <div>
      <button onClick={fsg}>firestore get data</button>
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
