import type { Container } from "pixi.js";
import { getGameEngine } from "../game-engine";
import { ComponentType } from "../components/base-component";

export abstract class BaseEntity extends ComponentType {
  protected _ge = getGameEngine();
  pixiElem?: Container;
  ecsEntityId?: number;
  label?: string;

  abstract create(): void | Promise<void>;
  destroy(): void {
    this.pixiElem?.destroy();
  }
}
