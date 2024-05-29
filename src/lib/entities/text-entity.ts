import "@esengine/g-framework";
import { Text } from "pixi.js";
import { EnumContainerLabel } from "../common/utils";
import { BaseEntity } from "./base-entity";

export class TextEntity extends BaseEntity {
  // constructor(
  //   id: number,
  //   entityManager: gs.EntityManager,
  //   componentManagers: Map<
  //     new (entityId: number) => gs.Component,
  //     gs.ComponentManager<any>
  //   >,
  //   private wording: string,
  //   private style?: TextStyle | TextStyleOptions
  // ) {
  //   super(id, entityManager, componentManagers);
  // }

  onCreate(): void {
    const t = new Text({
      text: "Hello, Pixi!",
      anchor: { x: 0.5, y: 0.5 },
      style: {
        fontSize: 48,
        fill: "white",
        align: "center",
      },
    });

    // const t = new Text({
    //   text: this.wording,
    //   anchor: { x: 0.5, y: 0.5 },
    //   style: this.style,
    // });

    t.interactive = true;
    t.addEventListener("pointerdown", (event) => {
      console.log(`text pointerdown => ${event.client}`);
    });

    // t.position.set(
    //   this._ge.pixiApp.screen.width / 2,
    //   this._ge.pixiApp.screen.height / 2
    // );

    this.pixiComp = t;
    this.zIndex = 10;
    this.parentContainerName = EnumContainerLabel.root;
  }

  onDestroy(): void {
    this.pixiComp?.destroy();
  }
}
