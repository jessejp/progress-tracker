import "./App.css";
import Header from "./containers/Header";
import Entries from "./containers/Entries";
import Graph from "./containers/Graph";
import AddEntryForm from "./containers/AddEntryForm";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate replace to="/entries" />} />
          <Route path="/entries" element={<Entries />} />
          <Route path="/addnew" element={<AddEntryForm />} />
          <Route path="/graphs" element={<Graph />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
