import RookEntity from "../../entities/chessPiece/RookEntity";
import ChessSystem from "../../system/ChessSystem";
import { Position, Team } from "../../types";
import Rook from "./Rook";
import Unit from "./Unit";

class King extends Unit {
  private _canIsCastling: boolean;

  constructor(team: Team, defaultPosition: Position, system: ChessSystem) {
    super(team, "king", defaultPosition, system);
    this._canIsCastling = true;
  }

  public get canIsCastling() {
    return this._canIsCastling;
  }

  getCanMovePositions(): Position[] {
    const result: Position[] = [];
    const row = this.position[0];
    const col = this.position[1];
    if (this._getCanMove([row + 1, col])) result.push([row + 1, col]);
    if (this._getCanMove([row + 1, col + 1])) result.push([row + 1, col + 1]);
    if (this._getCanMove([row + 1, col - 1])) result.push([row + 1, col - 1]);
    if (this._getCanMove([row - 1, col])) result.push([row - 1, col]);
    if (this._getCanMove([row - 1, col + 1])) result.push([row - 1, col + 1]);
    if (this._getCanMove([row - 1, col - 1])) result.push([row - 1, col - 1]);
    if (this._getCanMove([row, col + 1])) result.push([row, col + 1]);
    if (this._getCanMove([row, col - 1])) result.push([row, col - 1]);

    return [...result, ...this._getCastlingMovePositions()];
  }

  private _getCanMove(position: Position) {
    const canMove = this.getCanIsMove(position);

    return canMove;
  }

  private _getCastlingMovePositions() {
    const rooks = this.system.findUnitByType("rook");
    const castlingTargetRooks = rooks.filter((rookEntity) => {
      const rookComponent: Rook = rookEntity.unitComponent as Rook;
      return rookComponent.canIsCastling;
    });
    console.log(castlingTargetRooks);
    return [];
  }
}

export default King;
