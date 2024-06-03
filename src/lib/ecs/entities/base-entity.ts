import type { Container } from "pixi.js";
import { type ComponentType } from "..";
import { getGameEngine } from "../../game-engine";

abstract class ComponentAbstractClass implements ComponentType {}
export abstract class BaseEntity implements ComponentAbstractClass {
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
