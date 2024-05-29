import "@esengine/g-framework";
import type { GameEngine } from "../game-engine";

export abstract class BaseSystem extends gs.System {
  private _gs?: GameEngine;
  public get gs(): GameEngine {
    if (!this._gs) {
      throw new Error("please setup the GameEngine object");
    }
    return this._gs;
  }
  public set gs(value: GameEngine) {
    this._gs = value;
  }

  abstract entityFilter(entity: gs.Entity): boolean;
  abstract update(entities: gs.Entity[]): void;
}
