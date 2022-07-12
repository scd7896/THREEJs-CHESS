import ChessSystem from "../../system/ChessSystem";
import { Position, Team } from "../../types";
import Unit from "./Unit";

class Rook extends Unit {
  constructor(team: Team, defaultPosition: Position, system: ChessSystem) {
    super(team, "rook", defaultPosition, system);
  }

  getCanMovePositions(): Position[] {
    return [...this._getPositions("row"), ...this._getPositions("col")];
  }

  private _getCanMove(position: Position) {
    const unit = this.system.getUnitByPosition(position)[0];
    if (!unit) return true;
    if (unit.team === this.team) return false;
    return true;
  }

  private _getPositions(type: "row" | "col"): Position[] {
    const result: Position[] = [];
    const base = type === "row" ? this.position[0] : this.position[1];
    let up = base + 1;
    let down = base - 1;

    while (up < 8 || down >= 0) {
      if (up < 8) {
        const row = type === "row" ? up : this.position[0];
        const col = type === "col" ? up : this.position[1];
        if (this._getCanMove([row, col])) result.push([row, col]);
        const unit = this.system.getUnitByPosition([row, col])[0];
        if (unit) up = 8;
      }

      if (down >= 0) {
        const row = type === "row" ? down : this.position[0];
        const col = type === "col" ? down : this.position[1];
        if (this._getCanMove([row, col])) result.push([row, col]);
        const unit = this.system.getUnitByPosition([row, col])[0];
        if (unit) down = -1;
      }

      up++;
      down--;
    }

    return result;
  }
}

export default Rook;
