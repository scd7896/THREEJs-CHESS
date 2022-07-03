export type Position = [number, number];

export type UnitType = "pawn" | "rook" | "bishop" | "knight" | "king" | "queen";

export type Team = "black" | "white";

export interface IChess {
  team: Team;

  type: UnitType;

  position: Position;
}
