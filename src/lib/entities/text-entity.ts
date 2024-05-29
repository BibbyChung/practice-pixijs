import { Text, type TextStyle, type TextStyleOptions } from "pixi.js";
import { EnumContainerLabel } from "../common/utils";
import { CreateComponent } from "../components/create-component";
import { PlacementComponent } from "../components/placement-component";
import { BaseEntity } from "./base-entity";

export class TextEntity extends BaseEntity {
  constructor(
    private wording: string,
    private style?: TextStyle | TextStyleOptions
  ) {
    super();
  }

  create(): void | Promise<void> {
    const t = new Text({
      text: this.wording,
      anchor: { x: 0.5, y: 0.5 },
      style: this.style,
    });
    t.interactive = true;
    t.addEventListener("pointerdown", (event) => {
      console.log(`text pointerdown => ${event.client}`);
    });
    t.position.set(
      this._ge.pixiApp.screen.width / 2,
      this._ge.pixiApp.screen.height / 2
    );
    this.pixiElem = t;
  }
}

export const getTextEntity = () => {
  const ee = new TextEntity("Hello, Pixi!", {
    fontSize: 48,
    fill: "white",
    align: "center",
  });
  return Object.assign(ee, {
    createComponent: new CreateComponent(ee),
    placementComponent: new PlacementComponent(ee, EnumContainerLabel.root, 20),
  });
};
