import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Entries from "./pages/Entries";
import Graph from "./pages/Graph";
import Authenticate from "./pages/Authenticate";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {getEntryData} from "./store/data-actions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEntryData());
  }, [dispatch]);

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
