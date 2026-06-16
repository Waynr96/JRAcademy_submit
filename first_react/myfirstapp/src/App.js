import logo from "./logo.svg";
import "./App.css";

function App() {
  const studentName = "Lily";
  const studentAge = 18;
  const studentCity = "Brisbane";

  return (
    <div className="App">
      <h1>Student Information</h1>
      <p>Name: {studentName}</p>
      <p>Age: {studentAge}</p>
      <p>City: {studentCity}</p>
    </div>
  );
}

export default App;
