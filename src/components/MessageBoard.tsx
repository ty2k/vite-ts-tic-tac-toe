import { useBoundStore } from "../stores/useBoundStore";

import "./MessageBoard.css";

export function MessageBoard() {
  const resetBoard = useBoundStore((state) => state.resetBoard);

  return (
    <div className="message-board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetBoard} className="reset">
        Reset Game
      </button>
    </div>
  );
}
