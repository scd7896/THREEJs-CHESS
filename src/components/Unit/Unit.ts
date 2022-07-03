import { Position } from "../../types";

export default abstract class Unit {
	abstract getCanMovePosition(): Position;

	abstract move(position: Position): void;

	abstract remove(): void;

	attack(unit: Unit) {
		unit.remove();
	}
}
