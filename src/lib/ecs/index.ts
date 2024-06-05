import type { CollisionComponent } from "./components/collision-component";
import type { ContainerComponent } from "./components/container-component";
import type { CreateComponent } from "./components/create-component";
import type { DestroyComponent } from "./components/destroy-component";
import type { MoveComponent } from "./components/move-component";
import type { PlacementComponent } from "./components/placement-component";
import type { RandomColorFillComponent } from "./components/random-color-fill-component";
import type { RotationComponent } from "./components/rotation-component";
import { CollisionSystem } from "./systems/collision-system";
import { CreateSystem } from "./systems/create-system";
import { DestroySystem } from "./systems/destroy-system";
import { MoveSystem } from "./systems/move-system";
import { PlacementSystem } from "./systems/placement-system";
import { RandomColorFillSystem } from "./systems/random-color-fill-system";
import { RotationSystem } from "./systems/rotation-system";

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
  rotationComponent?: RotationComponent;
  randomColorFillComponent?: RandomColorFillComponent;
};

// systems
export const systemClasses = [
  CollisionSystem,
  CreateSystem,
  DestroySystem,
  MoveSystem,
  PlacementSystem,
  RotationSystem,
  RandomColorFillSystem,
];
