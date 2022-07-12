import ChessSystem from "../../system/ChessSystem";
import { Position, Team } from "../../types";
import Unit from "./Unit";

class King extends Unit {
  constructor(team: Team, defaultPosition: Position, system: ChessSystem) {
    super(team, "king", defaultPosition, system);
  }

  private _kingCanMove(position: Position) {
    const canMove = this.getCanIsMove(position);

    return canMove;
  }

  getCanMovePositions(): Position[] {
    const result: Position[] = [];
    const row = this.position[0];
    const col = this.position[1];
    if (this._kingCanMove([row + 1, col])) result.push([row + 1, col]);
    if (this._kingCanMove([row + 1, col + 1])) result.push([row + 1, col + 1]);
    if (this._kingCanMove([row + 1, col - 1])) result.push([row + 1, col - 1]);
    if (this._kingCanMove([row - 1, col])) result.push([row - 1, col]);
    if (this._kingCanMove([row - 1, col + 1])) result.push([row - 1, col + 1]);
    if (this._kingCanMove([row - 1, col - 1])) result.push([row - 1, col - 1]);
    if (this._kingCanMove([row, col + 1])) result.push([row, col + 1]);
    if (this._kingCanMove([row, col - 1])) result.push([row, col - 1]);

    return result;
  }
}

export default King;
