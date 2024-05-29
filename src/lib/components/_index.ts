import type { BaseEntity } from "../entities/base-entity";
import type { ContainerComponent } from "./container-component";
import type { CreateComponent } from "./create-component";
import type { DestroyComponent } from "./destroy-component";
import type { MoveComponent } from "./move-component";
import type { PlacementComponent } from "./placement-component";

export type ComponentType =
  | BaseEntity & {
      createComponent?: CreateComponent;
      containerComponent?: ContainerComponent;
      placementComponent?: PlacementComponent;
      destroyComponent?: DestroyComponent;
      moveComponent?: MoveComponent;
    };
