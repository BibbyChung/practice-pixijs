import { Container } from "pixi.js";
import { EnumContainerLabel } from "../../common/utils";
import { BaseEntity } from "./base-entity";

export class ContainerEntity extends BaseEntity {
  create(): void | Promise<void> {
    const c = new Container();
    c.label = EnumContainerLabel.root;
    this.pixiElem = c;
  }
}
