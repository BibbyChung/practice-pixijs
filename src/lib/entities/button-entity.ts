import { Sprite } from "pixi.js";
import { BaseEntity } from "./base-entity";
import { DestroyComponent } from "../components/destroy-component";
export class ButtonEntity extends BaseEntity {
  create(): void | Promise<void> {
    const sp = Sprite.from(this._ge.loadScreenAssets.ghost);
    this.pixiElem = sp;
    sp.position.set(
      this._ge.pixiApp.screen.width / 2,
      this._ge.pixiApp.screen.height - 100
    );
    sp.anchor.set(0.5);
    sp.scale.set(0.3, 0.3);
    sp.interactive = true;

    sp.on("pointerdown", (event) => {
      console.log(`button pointerdown => ${event.client}`);

      const self = this._ge.miniplexECS.entity(this.ecsEntityId ?? 0);
      if (self) {
        this._ge.addComponent(
          self,
          "destroyComponent",
          new DestroyComponent(self)
        );
      }
    });
  }
}
