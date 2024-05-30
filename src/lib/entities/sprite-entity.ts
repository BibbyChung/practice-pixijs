import { Sprite } from "pixi.js";
import { BaseEntity } from "./base-entity";
import { DestroyComponent } from "../components/destroy-component";
import { EnumContainerLabel } from "../common/utils";
import { CreateComponent } from "../components/create-component";
import { MoveComponent } from "../components/move-component";
import { PlacementComponent } from "../components/placement-component";
import { getComponentKV } from "../components/base-component";

export class SpriteEntity extends BaseEntity {
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

export const getSpriteEntity = () => {
  const entity = new SpriteEntity();
  const componentKV = getComponentKV({
    createComponent: new CreateComponent(entity),
    placementComponent: new PlacementComponent(
      entity,
      EnumContainerLabel.root,
      10
    ),
    moveComponent: new MoveComponent(entity, 3, 4),
  });

  return {
    entity,
    componentKV,
  };
};
