import "./App.css";
import Header from "./components/Header";
import Entries from "./components/Entries/Entries";
import Graph from "./components/Graph/Graph";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate replace to="/entries" />} />
          <Route path="/entries/*" element={<Entries />} />
          <Route path="/graphs" element={<Graph />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
