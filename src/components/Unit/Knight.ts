import ChessSystem from "../../system/ChessSystem";
import { Position, Team } from "../../types";
import Unit from "./Unit";

class Knight extends Unit {
  constructor(team: Team, defaultPosition: Position, system: ChessSystem) {
    super(team, "knight", defaultPosition, system);
  }
  getCanMovePositions(): Position[] {
    return [
      ...this._getMovePositions("row", true),
      ...this._getMovePositions("row", false),
      ...this._getMovePositions("col", true),
      ...this._getMovePositions("col", false),
    ];
  }

  private _getIsMove(position: Position) {
    const unit = this.system.getUnitByPosition(position)[0];
    if (!unit) return true;
    if (unit.team === this.team) return false;
    return true;
  }

  private _getMovePositions(type: "col" | "row", isUp: boolean): Position[] {
    const result: Position[] = [];
    const diff = isUp ? 2 : -2;
    const base = type === "row" ? this.position[0] + diff : this.position[1] + diff;
    const left = type === "row" ? this.position[1] - 1 : this.position[0] - 1;
    const right = type === "row" ? this.position[1] + 1 : this.position[0] + 1;

    if (base >= 0 && base < 8) {
      if (left >= 0 && left < 8) {
        const row = type === "row" ? base : left;
        const col = type === "row" ? left : base;
        if (this.getCanIsMove([row, col])) result.push([row, col]);
      }
      if (right >= 0 && right < 8) {
        const row = type === "row" ? base : right;
        const col = type === "row" ? right : base;
        if (this._getIsMove([row, col])) result.push([row, col]);
      }
    }

    return result;
  }
}

export default Knight;
