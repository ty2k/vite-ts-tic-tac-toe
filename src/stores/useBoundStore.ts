import { create, StateCreator } from "zustand";

import { Position, SquareState, BoardState } from "../common-types";

interface GameSlice {
  board: BoardState;
  setBoard: (board: BoardState) => void;
  resetBoard: () => void;
  turn: SquareState;
  setTurn: (turn: SquareState) => void;
  winner: SquareState;
  setWinner: (winner: SquareState) => void;
  isGameOver: boolean;
  setIsGameOver: (isGameOver: boolean) => void;
  winningSquares: [Position | null, Position | null, Position | null];
  setWinningSquares: (
    winningSquares: [Position | null, Position | null, Position | null]
  ) => void;
}

const createGameSlice: StateCreator<GameSlice> = (set) => ({
  // Playfield state
  board: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
  setBoard: (board: BoardState) => set({ board }),

  // Reset all the stateful variables to begin a new game
  resetBoard: () =>
    set({
      board: [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
      turn: "x",
      isGameOver: false,
      winner: null,
      winningSquares: [null, null, null],
    }),

  // Whose turn is it, X always goes first
  turn: "x",
  setTurn: (turn: SquareState) => set({ turn }),

  // Who is the winner
  winner: null,
  setWinner: (winner: SquareState) => set({ winner: winner, turn: null }),

  // Is the game over (due to win or no tiles left)
  isGameOver: false,
  setIsGameOver: (isGameOver: boolean) => set({ isGameOver }),

  // Which set of squares won, for drawing a line
  winningSquares: [null, null, null],
  setWinningSquares: (
    winningSquares: [Position | null, Position | null, Position | null]
  ) =>
    set({
      winningSquares,
    }),
});

export const useBoundStore = create<GameSlice>()((...a) => ({
  ...createGameSlice(...a),
}));
