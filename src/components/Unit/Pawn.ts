import { Position, Team } from "../../types";
import Unit from "./Unit";

class Pawn extends Unit {
  constructor(team: Team, defaultPosition: Position) {
    super(team, "pawn", defaultPosition);
  }

  getCanMovePosition(): Position {
    throw new Error("Method not implemented.");
  }

  remove(): void {
    throw new Error("Method not implemented.");
  }
}

export default Pawn;
