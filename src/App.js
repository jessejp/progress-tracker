import "./App.css";
import Header from "./containers/Header";
import Entries from "./containers/Entries";

function App() {
  return (
    <div className="App">
      <div>
        <Header></Header>
        <Entries></Entries>
      </div>
    </div>
  );
}

export default App;
