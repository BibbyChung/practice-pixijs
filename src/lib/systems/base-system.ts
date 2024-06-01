import { getGameEngine } from "../game-engine";

export abstract class BaseSystem {
  protected _ge = getGameEngine();
  protected abstract getQuery(): unknown;
  abstract execute(): void;
}

export const systemClasses = [
  import("./collision-system").then((a) => a.CollisionSystem),
  import("./create-system").then((a) => a.CreateSystem),
  import("./destroy-system").then((a) => a.DestroySystem),
  import("./move-system").then((a) => a.MoveSystem),
  import("./placement-system").then((a) => a.PlacementSystem),
];
