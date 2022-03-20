import "./App.css";
import Header from "./containers/Header";
import Entries from "./containers/Entries";
import Graph from "./containers/Graph";
import AddEntryForm from "./containers/AddEntryForm";

function App() {
  return (
    <div className="App">
      <div>
        <Header />
        <Entries />
        <Graph />
        <AddEntryForm />
      </div>
    </div>
  );
}

export default App;
