import BishopEntity from "../entities/chessPiece/BishopEntity";
import BoardEntity from "../entities/BoardEntity";
import CameraEntity from "../entities/CameraEntity";
import { ChessUnitEntity } from "../entities/Entity";
import KingEntity from "../entities/chessPiece/KnigEntity";
import KnightEntity from "../entities/chessPiece/KnightEntity";
import PawnEntity from "../entities/chessPiece/PawnEntity";
import QueenEntity from "../entities/chessPiece/QueenEntity";
import RookEntity from "../entities/chessPiece/RookEntity";
import { Position } from "../types";
import { defaultChessUnits } from "../utils/constract";

import System from "./System";

export default class ChessSystem extends System {
  private _boardEntity: BoardEntity;
  private _chessEntity: ChessUnitEntity[];
  private _cameraEntity: CameraEntity;
  getUnitByPosition(position: Position) {}

  getBoardEntity() {
    return this._boardEntity;
  }

  constructor() {
    super();

    this._cameraEntity = new CameraEntity(this);
    this._boardEntity = new BoardEntity(this);
    this._chessEntity = defaultChessUnits.map(({ team, position, type }) => {
      if (type === "rook") return new RookEntity({ team, type, position }, this);
      if (type === "knight") return new KnightEntity({ team, type, position }, this);
      if (type === "bishop") return new BishopEntity({ team, type, position }, this);
      if (type === "queen") return new QueenEntity({ team, type, position }, this);
      if (type === "king") return new KingEntity({ team, type, position }, this);
      return new PawnEntity({ team, position, type }, this);
    });
    this.start();
  }

  update(time: number): void {
    this._boardEntity.update(time);
    this._chessEntity.map((it) => it.update(time));
    this._cameraEntity.update(time);
  }

  start() {
    this._boardEntity.start();

    this._initChessBoard();
  }

  private _initChessBoard() {
    this._chessEntity.map((it) => it.start());
  }
}
