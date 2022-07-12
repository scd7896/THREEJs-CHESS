import ChessSystem from "../../system/ChessSystem";
import { Position, Team } from "../../types";
import Unit from "./Unit";

class Queen extends Unit {
  constructor(team: Team, defaultPosition: Position, system: ChessSystem) {
    super(team, "queen", defaultPosition, system);
  }

  getCanMovePositions(): Position[] {
    return [
      ...this._getLikeRookPositions("row"),
      ...this._getLikeRookPositions("col"),
      ...this._getLikeBishopPositions(true),
      ...this._getLikeBishopPositions(false),
    ];
  }

  private _getCanMove(position: Position) {
    const unit = this.system.getUnitByPosition(position)[0];
    if (!unit) return true;
    if (unit.team === this.team) return false;
    return true;
  }

  private _getLikeRookPositions(type: "row" | "col"): Position[] {
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

  private _getLikeBishopPositions(isUp: boolean): Position[] {
    const result: Position[] = [];
    const diff = isUp ? -1 : 1;
    let row = this.position[0] + diff;
    let colLeft = this.position[1];
    let colRight = colLeft;

    while (row >= 0 && row < 8) {
      colLeft--;
      colRight++;
      const leftOtherUnit = this.system.getUnitByPosition([row, colLeft])[0];
      const rightOthrUnit = this.system.getUnitByPosition([row, colRight])[0];
      if (colLeft >= 0) {
        if (leftOtherUnit) {
          if (leftOtherUnit.team !== this.team) result.push([row, colLeft]);
          colLeft = -1;
        } else {
          result.push([row, colLeft]);
        }
      }
      if (colRight < 8) {
        if (rightOthrUnit) {
          if (rightOthrUnit.team !== this.team) result.push([row, colRight]);
          colRight = 8;
        } else {
          result.push([row, colRight]);
        }
      }
      row += diff;
    }

    return result;
  }
}

export default Queen;
