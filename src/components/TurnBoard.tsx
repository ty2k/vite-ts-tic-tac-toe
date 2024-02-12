import { useBoundStore } from "../stores/useBoundStore";

import "./TurnBoard.css";

export function TurnBoard() {
  const turn = useBoundStore((state) => state.turn);
  const winner = useBoundStore((state) => state.winner);

  return (
    <div className="turn-board">
      <h2>
        Turn: {turn && <span className="value">{turn.toUpperCase()}</span>}
      </h2>
      <h2>
        Winner:{" "}
        {winner && <span className="value">{winner.toUpperCase()}</span>}
      </h2>
    </div>
  );
}
