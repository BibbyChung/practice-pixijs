import "@esengine/g-framework";
import { Container } from "pixi.js";
import { EnumContainerLabel } from "../common/utils";
import { BaseEntity } from "./base-entity";

export class RootContainerEntity extends BaseEntity {
  onCreate(): void {
    const c = new Container();
    c.label = EnumContainerLabel.root;

    this.pixiComp = c;
    this.zIndex = 10;
    this.parentContainerName = EnumContainerLabel.none;
  }

  onDestroy(): void {
    this.pixiComp?.destroy();
  }
}
