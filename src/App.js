import "./App.css";
import Header from "./components/Header";
import Entries from "./pages/Entries";
import Graph from "./pages/Graph";
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
