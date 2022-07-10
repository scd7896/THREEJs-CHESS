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
import { Event, Intersection, Object3D, Raycaster, Vector2 } from "three";

export default class ChessSystem extends System {
  private _boardEntity: BoardEntity;
  private _chessEntity: ChessUnitEntity[];
  private _cameraEntity: CameraEntity;
  private _raycaster: Raycaster;
  private _pointer: Vector2;
  private _selectedUnit: ChessUnitEntity | null = null;
  private _selects: Intersection<Object3D<Event>>[];

  getUnitByPosition(position: Position): ChessUnitEntity[] {
    return this._chessEntity.filter((it) => it.position[0] === position[0] && it.position[1] === position[1]);
  }

  finishMove() {
    this._chessEntity.map((it) => it.unselect());
    this._pointer = new Vector2();
    if (this._selectedUnit) {
      const enemy = this.getUnitByPosition(this._selectedUnit.position).filter(
        (it) => it.team !== this._cameraEntity.turn,
      );
      if (enemy[0]) this._selectedUnit.attack(enemy[0]);
    }

    this._cameraEntity.changeTurn();
    this._selectedUnit = null;
  }

  getBoardEntity() {
    return this._boardEntity;
  }

  removeUnitEntity(chessUnit: ChessUnitEntity) {
    this._chessEntity = this._chessEntity.filter((it) => it !== chessUnit);
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

    this._raycaster = new Raycaster();
    this._pointer = new Vector2();
    this._selects = [];
    window.addEventListener("mouseup", (event) => {
      this._pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      this._pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });
  }

  update(time: number): void {
    this._boardEntity.update(time);
    this._chessEntity.map((it) => it.update(time));
    this._cameraEntity.update(time);

    this.raycasting();
  }

  start() {
    this._boardEntity.start();

    this._initChessBoard();
  }

  private _initChessBoard() {
    this._chessEntity.map((it) => it.start());
  }

  private raycasting() {
    this._raycaster.setFromCamera(this._pointer, this.camera);

    const intersects = this._raycaster.intersectObjects(this.scene.children);
    for (let i = 0; i < intersects.length; i++) {
      if (this._selects[i]?.object.uuid !== intersects[i].object.uuid) {
        this._selects = intersects;
        const isUnitClick = this._unitClickCheck();
        const isMoveClick = this._boardClickCheck();

        if (!isUnitClick && !isMoveClick) {
          this._chessEntity.map((it) => it.unselect());
        }
        break;
      }
    }
  }

  private _unitClickCheck() {
    const units = this._chessEntity.filter((chessIt) => {
      return this._selects.find((it) => chessIt.findChildren(it.object));
    });

    const [selectUnit] = units.filter((it) => it.team === this._cameraEntity.turn);

    if (selectUnit) {
      selectUnit?.select();
      this._selectedUnit = selectUnit;
      console.log(this._selectedUnit);
      return true;
    }

    return false;
  }

  private _boardClickCheck() {
    if (this._selectedUnit) {
      const targetMesh = this._boardEntity.canMovePositionsMesh.find((mesh) =>
        this._selects.find((it) => it.object === mesh),
      );
      if (targetMesh) {
        const [_, row, col] = targetMesh.name.split("/");
        this._selectedUnit.move([Number(row), Number(col)]);
      }
    }

    return false;
  }
}
