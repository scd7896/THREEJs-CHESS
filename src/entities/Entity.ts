import { MeshStandardMaterial, Vector3 } from "three";
import ChessSystem from "../system/ChessSystem";
import { IChess, Position, Team, UnitType } from "../types";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Unit from "../components/Unit/Unit";

export default abstract class Entity<T> {
  private _system: T;
  constructor(system: T) {
    this._system = system;
  }

  public get system() {
    return this._system;
  }

  abstract start(): void;

  abstract update(delta: number): void;
}

export abstract class ChessUnitEntity extends Entity<ChessSystem> {
  protected _unitComponent!: Unit;

  private _type: UnitType;
  private _team: Team;
  private _unit!: GLTF;

  constructor(chess: IChess, system: ChessSystem) {
    super(system);
    this._type = chess.type;
    this._team = chess.team;
  }

  get position() {
    return this._unitComponent.position;
  }

  get team() {
    return this._team;
  }

  get type() {
    return this._type;
  }

  get unit() {
    return this._unit;
  }

  loadUnit() {
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(`/gltf/${this.type}.gltf`, (obj) => {
      this._unit = obj;
      obj.scene.name = obj.scene.uuid;
      obj.scene.scale.set(4, 5, 4);
      const vector3 = this.getVectorByPosition();
      obj.scene.position.set(vector3.x, vector3.y, vector3.z);
      this._unitComponent._vector = obj.scene.position;

      const material = new MeshStandardMaterial({
        color: this.team === "white" ? "#dfdfdf" : "#964b00",
        roughness: 0,
        metalness: 0.5,
      });
      obj.scene.traverse((o: any) => {
        o.material = material;
      });

      if (this.team === "white") {
        obj.scene.rotation.y = Math.PI;
        obj.scene.rotation.x = -(1 / 10) * Math.PI;
      }

      if (this.team === "black") {
        obj.scene.rotation.x = (1 / 10) * Math.PI;
      }
      this.system.scene.add(obj.scene);
    });
  }

  findChildren(node: any) {
    let tmpNode = node;
    while (tmpNode) {
      if (this.unit?.scene.uuid === tmpNode.uuid) return tmpNode;
      tmpNode = tmpNode.parent;
    }
    return null;
  }

  getVectorByPosition() {
    const oneCellSize = 8;
    const defaultCell = -28;
    const [row, col] = this._unitComponent.position;

    return new Vector3(defaultCell + col * oneCellSize, 0, defaultCell + row * oneCellSize);
  }

  unselect() {
    const boardEntity = this.system.getBoardEntity();
    boardEntity.setCanMovePositions([]);
  }

  private _remove() {
    this.system.scene.remove(this._unit.scene);
    this.system.removeUnitEntity(this);
  }

  attack(unit: ChessUnitEntity) {
    unit._remove();
  }

  select(): void {
    const positions = this._unitComponent.getCanMovePositions();
    const board = this.system.getBoardEntity();
    board.setCanMovePositions(positions);
  }

  move(position: Position) {
    this._unitComponent.position = position;
    this._unitComponent.pushMovePath(position);
    this._unitComponent.move(position);
  }

  start(): void {
    this.loadUnit();
  }

  update(delta: number): void {
    this._unitComponent.update(delta);
  }
}
