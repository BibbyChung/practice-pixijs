import type { CollisionComponent } from "./components/collision-component";
import type { ContainerComponent } from "./components/container-component";
import type { CreateComponent } from "./components/create-component";
import type { DestroyComponent } from "./components/destroy-component";
import type { MoveComponent } from "./components/move-component";
import type { PlacementComponent } from "./components/placement-component";
import { CollisionSystem } from "./systems/collision-system";
import { CreateSystem } from "./systems/create-system";
import { DestroySystem } from "./systems/destroy-system";
import { MoveSystem } from "./systems/move-system";
import { PlacementSystem } from "./systems/placement-system";

export type ComponentTypeKV = { [K in keyof ComponentType]: ComponentType };

export const getComponentKV = (kv: ComponentType) => kv as ComponentTypeKV;

// components
export type ComponentType = {
  createComponent?: CreateComponent;
  containerComponent?: ContainerComponent;
  placementComponent?: PlacementComponent;
  destroyComponent?: DestroyComponent;
  moveComponent?: MoveComponent;
  collisionComponent?: CollisionComponent;
};

// systems
export const systemClasses = [
  CollisionSystem,
  CreateSystem,
  DestroySystem,
  MoveSystem,
  PlacementSystem,
];
