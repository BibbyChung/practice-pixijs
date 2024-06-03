import { getGameEngine } from "../../game-engine";

export abstract class BaseSystem {
  protected _ge = getGameEngine();
  protected abstract getQuery(): unknown;
  abstract execute(): void;
}
