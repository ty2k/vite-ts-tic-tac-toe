import { useEffect } from "react";

import { useBoundStore } from "../stores/useBoundStore";

import { Square } from "./Square";

import "./GameBoard.css";

export function GameBoard() {
  const board = useBoundStore((state) => state.board);
  const setIsGameOver = useBoundStore((state) => state.setIsGameOver);
  const setWinner = useBoundStore((state) => state.setWinner);
  const setWinningSquares = useBoundStore((state) => state.setWinningSquares);

  // This useEffect runs on every change of the `board` variable, and is used to
  // determine if a win state has been reached.
  useEffect(() => {
    // Top row
    if (
      board[0][0] &&
      board[0][0] === board[0][1] &&
      board[0][0] === board[0][2]
    ) {
      setIsGameOver(true);
      setWinner(board[0][0]);
      setWinningSquares([
        { row: 0, col: 0 },
        { row: 0, col: 1 },
        { row: 0, col: 2 },
      ]);
    }

    // Middle row
    if (
      board[1][0] &&
      board[1][0] === board[1][1] &&
      board[1][0] === board[1][2]
    ) {
      setIsGameOver(true);
      setWinner(board[1][0]);
      setWinningSquares([
        { row: 1, col: 0 },
        { row: 1, col: 1 },
        { row: 1, col: 2 },
      ]);
    }

    // Bottom row
    if (
      board[2][0] &&
      board[2][0] === board[2][1] &&
      board[2][0] === board[2][2]
    ) {
      setIsGameOver(true);
      setWinner(board[2][0]);
      setWinningSquares([
        { row: 2, col: 0 },
        { row: 2, col: 1 },
        { row: 2, col: 2 },
      ]);
    }

    // Left column
    if (
      board[0][0] &&
      board[0][0] === board[1][0] &&
      board[0][0] === board[2][0]
    ) {
      setIsGameOver(true);
      setWinner(board[0][0]);
      setWinningSquares([
        { row: 0, col: 0 },
        { row: 1, col: 0 },
        { row: 2, col: 0 },
      ]);
    }

    // Middle column
    if (
      board[0][1] &&
      board[0][1] === board[1][1] &&
      board[0][1] === board[2][1]
    ) {
      setIsGameOver(true);
      setWinner(board[0][1]);
      setWinningSquares([
        { row: 0, col: 1 },
        { row: 1, col: 1 },
        { row: 2, col: 1 },
      ]);
    }

    // Right column
    if (
      board[0][2] &&
      board[0][2] === board[1][2] &&
      board[0][2] === board[2][2]
    ) {
      setIsGameOver(true);
      setWinner(board[0][2]);
      setWinningSquares([
        { row: 0, col: 2 },
        { row: 1, col: 2 },
        { row: 2, col: 2 },
      ]);
    }

    // Top left to bottom right
    if (
      board[0][0] &&
      board[0][0] === board[1][1] &&
      board[0][0] === board[2][2]
    ) {
      setIsGameOver(true);
      setWinner(board[0][0]);
      setWinningSquares([
        { row: 0, col: 0 },
        { row: 1, col: 1 },
        { row: 2, col: 2 },
      ]);
    }

    // Top right to bottom left
    if (
      board[0][2] &&
      board[0][2] === board[1][1] &&
      board[0][2] === board[2][0]
    ) {
      setIsGameOver(true);
      setWinner(board[0][2]);
      setWinningSquares([
        { row: 0, col: 2 },
        { row: 1, col: 1 },
        { row: 2, col: 0 },
      ]);
    }
  }, [board, setIsGameOver, setWinner, setWinningSquares]);

  return (
    <div className="board">
      {board.map((row, rowIndex) => {
        return (
          <div className="row" key={rowIndex}>
            {row.map((square, squareIndex) => {
              return (
                <Square
                  owner={square}
                  position={{ row: rowIndex, col: squareIndex }}
                  key={`${rowIndex}-${squareIndex}`}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
