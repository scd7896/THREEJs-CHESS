import ChessSystem from "../../system/ChessSystem";
import { Position, Team } from "../../types";
import Unit from "./Unit";

class Pawn extends Unit {
  private _isMove: boolean = false;

  constructor(team: Team, defaultPosition: Position, system: ChessSystem) {
    super(team, "pawn", defaultPosition, system);
  }

  private _canAttack() {}

  private _getCanMove(moveCount: number): Position | undefined {
    let calculateMove = this.team === "black" ? moveCount : moveCount * -1;
    const row = this.position[0] + calculateMove;
    const col = this.position[1];
    const result = this.system.getUnitByPosition([row, col]);
    console.log(result);
    if (result) return undefined;
    if (row < 0 || row >= 8) return undefined;
    if (col < 0 || col >= 8) return undefined;
    return [row, col];
  }

  getCanMovePositions(): Position[] {
    const result: Position[] = [];
    const oneMovePosition = this._getCanMove(1);
    if (oneMovePosition) {
      result.push(oneMovePosition);

      if (this._isMove === false) {
        const twoMovePosition = this._getCanMove(2);
        if (twoMovePosition) result.push(twoMovePosition);
      }
    }

    return result;
  }

  remove(): void {
    throw new Error("Method not implemented.");
  }
}

export default Pawn;
