import { Sprite } from "pixi.js";
import type { assetsImgKey } from "../../pixi-assets";
import { BaseEntity } from "./base-entity";

export class SpriteEntity extends BaseEntity {
  constructor(
    private assetKey: assetsImgKey,
    private scaleX: number = 1,
    private scaleY: number = 1,
    private positionX: number = 0,
    private positionY: number = 0
  ) {
    super();
  }

  create(): void | Promise<void> {
    const img = this._ge.window.document.querySelector(
      "#iiGhost"
    ) as HTMLImageElement;

    // const sp = Sprite.from(this._ge.loadScreenAssets[this.assetKey]);
    const sp = Sprite.from(img);
    this.pixiElem = sp;
    sp.position.set(this.positionX, this.positionY);
    sp.anchor.set(0.5);
    sp.scale.set(this.scaleX, this.scaleY);
    sp.interactive = true;

    sp.addEventListener("pointertap", (event) => {
      const bounds = sp.getBounds();
      console.log(
        `x:${bounds.x}, y:${bounds.y}, width:${bounds.width}, heigh:${bounds.height}`
      );

      // destroy entity
      // const self = this._ge.miniplexECS.entity(this.ecsEntityId ?? 0);
      // if (self) {
      //   this._ge.addComponent(
      //     self,
      //     "destroyComponent",
      //     new DestroyComponent(self)
      //   );
      // }
    });
  }
}
