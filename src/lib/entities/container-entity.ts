import { Container } from "pixi.js";
import { EnumContainerLabel } from "../common/utils";
import { ContainerComponent } from "../components/container-component";
import { CreateComponent } from "../components/create-component";
import { PlacementComponent } from "../components/placement-component";
import { BaseEntity } from "./base-entity";
import type {
  ComponentType,
  ComponentTypeKV,
} from "../components/base-component";

export class ContainerEntity extends BaseEntity {
  create(): void | Promise<void> {
    const c = new Container();
    c.label = EnumContainerLabel.root;
    this.pixiElem = c;
  }
}

export const getRootContainerEntity = () => {
  const entity = new ContainerEntity();
  const componetKV = {
    createComponent: new CreateComponent(entity),
    containerComponent: new ContainerComponent(entity),
    placementComponent: new PlacementComponent(
      entity,
      EnumContainerLabel.none,
      0
    ),
  } as ComponentTypeKV;
  return {
    entity,
    componetKV,
  };
};
