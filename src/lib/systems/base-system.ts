import { getGameSystem } from "../game-system";

export abstract class BaseSystem {
  protected _gs = getGameSystem();
  protected abstract getQuery(): unknown;
  abstract init(): void;
}
