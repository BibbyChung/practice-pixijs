import type { BaseEntity } from "../entities/base-entity";
import type { ContainerComponent } from "./container-component";
import type { CreateComponent } from "./create-component";
import type { DestroyComponent } from "./destroy-component";
import type { MoveComponent } from "./move-component";
import type { PlacementComponent } from "./placement-component";

export abstract class BaseComponent {
  get entity() {
    return this.comp as BaseEntity;
  }
  constructor(protected comp: ComponentType) {}
}

export abstract class ComponentType {
  createComponent?: CreateComponent;
  containerComponent?: ContainerComponent;
  placementComponent?: PlacementComponent;
  destroyComponent?: DestroyComponent;
  moveComponent?: MoveComponent;
}

export type ComponentTypeKV = { [K in keyof ComponentType]: ComponentType };

export const getComponentKV = (kv: ComponentType) => kv as ComponentTypeKV;
