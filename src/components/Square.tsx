import { Position, BoardState, SquareState } from "../common-types";
import { useBoundStore } from "../stores/useBoundStore";

import "./Square.css";

function charX() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 384 512"
      fill="currentColor"
      aria-labelledby="x-title-id"
    >
      <title id="x-title-id">X</title>
      <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
    </svg>
  );
}

function charO() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      fill="currentColor"
      aria-labelledby="o-title-id"
    >
      <title id="o-title-id">O</title>
      <path d="M224 96a160 160 0 1 0 0 320 160 160 0 1 0 0-320zM448 256A224 224 0 1 1 0 256a224 224 0 1 1 448 0z" />
    </svg>
  );
}

interface SquareProps {
  owner: SquareState;
  position: Position;
}

export function Square({ owner, position }: SquareProps) {
  const board: BoardState = useBoundStore((state) => state.board);
  const setBoard = useBoundStore((state) => state.setBoard);
  const turn: SquareState = useBoundStore((state) => state.turn);
  const setTurn = useBoundStore((state) => state.setTurn);
  const isGameOver = useBoundStore((state) => state.isGameOver);
  const setIsGameOver = useBoundStore((state) => state.setIsGameOver);
  const winningSquares = useBoundStore((state) => state.winningSquares);

  function handleSelectSquare() {
    const newBoard: BoardState = [...board];
    newBoard[position.row][position.col] = turn;
    setBoard(newBoard);

    // Check for available squares in case the game is over now
    let squaresAvailable = 0;

    newBoard.forEach((row) =>
      row.forEach((square) => {
        if (!square) squaresAvailable++;
      })
    );

    if (squaresAvailable === 0) {
      // Nullify `turn` so the display doesn't indicate that it's a player's
      // turn when there are no squares left to choose from.
      setTurn(null);
      setIsGameOver(true);
    } else {
      setTurn(turn === "x" ? "o" : "x");
    }
  }

  // If a square is a one of the "winning squares" (part of the straight line of
  // three squares in a winning state), give it a `winning` class to be styled.
  function getClasses() {
    const classes = ["square"];

    winningSquares.forEach((square) => {
      if (
        isGameOver &&
        square &&
        square.row === position.row &&
        square.col === position.col
      ) {
        classes.push("winning");
      }
    });

    return classes.join(" ");
  }

  return (
    <div className={getClasses()}>
      {/* Non-selectable markers, for squares that have already been chosen */}
      {owner === "x" && charX()}
      {owner === "o" && charO()}

      {/* Selectable square that hasn't been chosen yet */}
      {turn && owner === null && (
        <button
          aria-label={`Place mark ${turn.toUpperCase()} at row ${
            position.row + 1
          }, column ${position.col + 1}`}
          disabled={isGameOver ? true : false}
          onClick={handleSelectSquare}
        >
          {turn === "x" ? charX() : charO()}
        </button>
      )}
    </div>
  );
}
