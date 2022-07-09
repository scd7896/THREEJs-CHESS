import ChessSystem from "../system/ChessSystem";
import { IChess } from "../types";
import { ChessUnitEntity } from "./Entity";

class BishopEntity extends ChessUnitEntity {
  start(): void {
    this.loadUnit();
  }
  update(delta: number): void {
    // throw new Error("Method not implemented.");
  }

  constructor(chess: IChess, system: ChessSystem) {
    super(chess, system);
  }
}

export default BishopEntity;
