import { Sprite } from "pixi.js";
import { BaseEntity } from "./base-entity";
import { DestroyComponent } from "../components/destroy-component";
import { EnumContainerLabel, getRandomInt } from "../common/utils";
import { CreateComponent } from "../components/create-component";
import { MoveComponent } from "../components/move-component";
import { PlacementComponent } from "../components/placement-component";
import { getComponentKV } from "../components/base-component";
import type { assetsKey } from "../pixi-assets";
import { getGameEngine } from "../game-engine";

export class SpriteEntity extends BaseEntity {
  constructor(
    private assetKey: assetsKey,
    private scaleX: number = 0.5,
    private scaleY: number = 0.5,
    private positionX: number = 0,
    private positionY: number = 0
  ) {
    super();
  }

  create(): void | Promise<void> {
    const sp = Sprite.from(this._ge.loadScreenAssets[this.assetKey]);
    this.pixiElem = sp;
    sp.position.set(this.positionX, this.positionY);
    sp.anchor.set(0.5);
    sp.scale.set(this.scaleX, this.scaleY);
    sp.interactive = true;

    sp.on("pointerdown", (event) => {
      console.log(`button pointerdown => ${event.client}`);

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

export const getSpriteEntity = (
  key: assetsKey,
  scaleX: number,
  scaleY: number,
  positionX: number = 0,
  positionY: number = 0
) => {
  const ge = getGameEngine();
  let newPX = positionX;
  let newPY = positionY;
  if (positionX === 0 && positionY === 0) {
    newPX = ge.pixiApp.screen.width / 2;
    newPY = ge.pixiApp.screen.height / 2;
  }

  const vX = getRandomInt(20, 80) / 10 - 4;
  const vY = getRandomInt(20, 80) / 10 - 4;

  const entity = new SpriteEntity(key, scaleX, scaleY, newPX, newPY);
  const componentKV = getComponentKV({
    createComponent: new CreateComponent(entity),
    placementComponent: new PlacementComponent(
      entity,
      EnumContainerLabel.root,
      10
    ),
    moveComponent: new MoveComponent(entity, vX, vY),
  });

  return {
    entity,
    componentKV,
  };
};
