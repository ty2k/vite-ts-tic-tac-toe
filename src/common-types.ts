export type SquareState = "x" | "o" | null;
export type RowState = [SquareState, SquareState, SquareState];
export type BoardState = [RowState, RowState, RowState];
export interface Position {
  row: number;
  col: number;
}
