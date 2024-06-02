import type { Bounds } from "pixi.js";
import { BaseComponent } from "./base-component";
import type { Rect } from "@timohausmann/quadtree-js";

export class CollisionComponent extends BaseComponent {
  isCollision = false;

  public get bounds(): Bounds & Rect {
    return this.entity.pixiElem!.getBounds(false);
  }
}
