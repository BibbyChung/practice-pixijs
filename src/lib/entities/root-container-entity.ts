import { Container } from "pixi.js";
import { EnumContainerLabel } from "../common/utils";
import type { ComponentType } from "../components/base-component";
import { ContainerComponent } from "../components/container-component";
import { CreateComponent } from "../components/create-component";
import { PlacementComponent } from "../components/placement-component";
import { BaseEntity } from "./base-entity";

export class RootContainerEntity extends BaseEntity {
  create(): void | Promise<void> {
    const c = new Container();
    c.label = EnumContainerLabel.root;
    this.pixiElem = c;
  }
}

export const getRootContainerEntity = () => {
  const ee = new RootContainerEntity();

  return Object.assign(ee, {
    createComponent: new CreateComponent(ee),
    containerComponent: new ContainerComponent(ee),
    placementComponent: new PlacementComponent(ee, EnumContainerLabel.none, 0),
  }) as ComponentType;
};
