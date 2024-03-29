import ChessSystem from "../../system/ChessSystem";
import { Position, Team } from "../../types";
import Unit from "./Unit";

class Rook extends Unit {
  private _canIsCastling: boolean;

  constructor(team: Team, defaultPosition: Position, system: ChessSystem) {
    super(team, "rook", defaultPosition, system);
    this._canIsCastling = true;
  }

  public get canIsCastling() {
    return this._canIsCastling;
  }

  move(position: Position): void {
    super.move(position);
    this._canIsCastling = false;
  }

  getCanMovePositions(): Position[] {
    return [...this._getPositions("row"), ...this._getPositions("col")];
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
        if (this.getCanIsMove([row, col])) result.push([row, col]);
        const unit = this.system.getUnitByPosition([row, col])[0];
        if (unit) up = 8;
      }

      if (down >= 0) {
        const row = type === "row" ? down : this.position[0];
        const col = type === "col" ? down : this.position[1];
        if (this.getCanIsMove([row, col])) result.push([row, col]);
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
