import "./App.css";
import UserCard from "./UserCard";

function App() {
  return (
    <div>
      <UserCard name="Lily" age={18} />
      <UserCard name="Tom" age={20} />
    </div>
  );
}

export default App;
