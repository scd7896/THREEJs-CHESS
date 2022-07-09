import { AmbientLight, BoxGeometry, Mesh, MeshStandardMaterial, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import BishopEntity from "../entities/BishopEntity";
import BoardEntity from "../entities/BoardEntity";
import Entity from "../entities/Entity";
import KingEntity from "../entities/KnigEntity";
import KnightEntity from "../entities/KnightEntity";
import PawnEntity from "../entities/PawnEntity";
import QueenEntity from "../entities/QueenEntity";
import RookEntity from "../entities/RookEntity";
import { Position } from "../types";
import { defaultChessUnits } from "../utils/constract";

import System from "./System";

export default class ChessSystem extends System {
  private _boardEntity: BoardEntity;
  private _chessEntity: Entity<ChessSystem>[];
  private _tick: number;

  constructor() {
    super();
    this._tick = 0;
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

    // this._tick = (this._tick + time / 10000) % 360;
    // const cos = Math.cos(this._tick * Math.PI);
    // console.log(this.camera.position.z);
    // // 0: 40, 90: 0 180: -40, 270: 0, 360: 40
    // this.camera.position.set(0, this.camera.position.y, cos * 50);
    // this.camera.lookAt(0, 0, 0);
  }

  private _initChessBoard() {
    this._chessEntity.map((it) => it.start());
  }

  start() {
    this._boardEntity.start();

    this._initChessBoard();
  }

  getUnitByPosition(position: Position) {}

  getBoardEntity() {
    return this._boardEntity;
  }
}
