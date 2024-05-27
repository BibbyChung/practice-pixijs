import { Assets, Sprite } from "pixi.js";
import type { Container, ContainerChild } from "pixi.js";
import {
  EnumContainerLabel,
  type IPosition,
  type IVelocity,
} from "./../components/_index";
import { getGameEngine } from "../game-engine";
import { BaseEntity } from "./base-entity";
export class ButtonEntity extends BaseEntity implements IPosition, IVelocity {
  isDestroying: boolean = false;
  destroy(): void {
    this.self?.destroy();
  }

  get position() {
    return (this.self as Sprite)?.position ?? null;
  }

  velocity: { x: number; y: number } = {
    x: 1,
    y: 2,
  };

  ecsEntityId?: number;
  parentContainerName: EnumContainerLabel = EnumContainerLabel.root;
  self: Container<ContainerChild> | null = null;
  isInited: boolean = false;
  async init() {
    const gs = getGameEngine();

    const texture = await Assets.load("/images/ghost.png");
    const sp = new Sprite(texture);
    this.self = sp;
    sp.position.set(gs.pixiApp.screen.width / 2, gs.pixiApp.screen.height);
    sp.anchor.set(0.5);
    sp.scale.set(0.3, 0.3);
    sp.interactive = true;

    sp.on("pointerdown", (event) => {
      console.log(`pointerdown => ${event.client}`);

      const ee = this._ge.miniplexECS.entity(this.ecsEntityId ?? 0);
      if (ee) {
        this._ge.miniplexECS.update(ee, (e) => {
          e.isDestroying = true;
        });
      }
    });
  }
}
