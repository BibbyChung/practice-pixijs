import type { Bounds } from "pixi.js";
import { BaseComponent } from "./base-component";

export class CollisionComponent extends BaseComponent {
  isCollision = false;

  public get bounds(): Bounds {
    return this.entity.pixiElem!.getBounds(false);
  }
}
