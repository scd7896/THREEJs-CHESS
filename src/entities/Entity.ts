import { MeshStandardMaterial, Vector3 } from "three";
import ChessSystem from "../system/ChessSystem";
import { IChess, Position, Team, UnitType } from "../types";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

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
  private _position: Position;
  private _type: UnitType;
  private _team: Team;
  private _unit!: GLTF;
  private _isSelect: boolean = false;

  constructor(chess: IChess, system: ChessSystem) {
    super(system);
    this._position = chess.position;
    this._type = chess.type;
    this._team = chess.team;
  }

  get isSelect() {
    return this._isSelect;
  }

  get position() {
    return this._position;
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
    const [row, col] = this._position;

    return new Vector3(defaultCell + col * oneCellSize, 0, defaultCell + row * oneCellSize);
  }

  select() {
    this._isSelect = true;
  }

  unselect() {
    this._isSelect = false;
  }
}
