import ChessSystem from "../../system/ChessSystem";
import { Position, Team } from "../../types";
import Unit from "./Unit";

export default class Bishop extends Unit {
  constructor(team: Team, defaultPosition: Position, system: ChessSystem) {
    super(team, "bishop", defaultPosition, system);
  }

  private _findPositions(isUp: boolean): Position[] {
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

  getCanMovePositions(): Position[] {
    const upPositions = this._findPositions(true);
    const downPositions = this._findPositions(false);

    return [...upPositions, ...downPositions];
  }
}
