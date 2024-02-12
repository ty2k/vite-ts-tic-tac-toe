import { GameBoard } from "./components/GameBoard";
import { MessageBoard } from "./components/MessageBoard";
import { TurnBoard } from "./components/TurnBoard";

import "./App.css";

function App() {
  return (
    <div className="app-container">
      <MessageBoard />
      <GameBoard />
      <TurnBoard />
    </div>
  );
}

export default App;
