import type { Container } from "pixi.js";
import { getGameEngine } from "../../game-engine";

export abstract class BaseEntity {
  protected _ge = getGameEngine();
  pixiElem?: Container;
  ecsEntityId?: number;
  label?: string;

  abstract create(): void | Promise<void>;
  destroy(): void {
    setTimeout(() => {
      this.pixiElem?.destroy();
    }, 0);
  }
}
