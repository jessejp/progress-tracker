import "./App.css";
import Header from "./containers/Header";
import Entries from "./containers/Entries";
import Graph from "./containers/Graph";
import DataProvider from "./store/DataProvider";

function App() {
  return (
    <DataProvider>
      <div className="App">
        <div>
          <Header />
          <Entries />
          <Graph />
        </div>
      </div>
    </DataProvider>
  );
}

export default App;
