import type { BoundsCollisionComponent } from './components/bounds-collision.component'
import type { CollisionComponent } from './components/collision.component'
import type { ContainerClickableComponent } from './components/container-clickable.component'
import type { ContainerComponent } from './components/container.component'
import type { CreateComponent } from './components/create.component'
import type { DestroyComponent } from './components/destroy.component'
import type { PlacementComponent } from './components/placement.component'
import type { PositionComponent } from './components/position.component'
import type { RandomColorFillComponent } from './components/random-color-fill.component'
import type { RotationComponent } from './components/rotation.component'
import type { VelocityComponent } from './components/velocity.component'
import { BoundsCollisionSystem } from './systems/bounds-collison.system'
import { CollisionSystem } from './systems/collision.system'
import { ContainerClickableSystem } from './systems/container-clickable.system'
import { CreateSystem } from './systems/create.system'
import { DestroySystem } from './systems/destroy.system'
import { MoveSystem } from './systems/move.system'
import { PlacementSystem } from './systems/placement.system'
import { RandomColorFillSystem } from './systems/random-color-fill.system'
import { RotationSystem } from './systems/rotation.system'

export type ComponentTypeKV = { [K in keyof ComponentType]: ComponentType }

export const getComponentKV = (kv: ComponentType) => kv as ComponentTypeKV

// components
export type ComponentType = {
  boundsCollisionComponent?: BoundsCollisionComponent
  collisionComponent?: CollisionComponent
  containerComponent?: ContainerComponent
  containerClickableComponent?: ContainerClickableComponent
  createComponent?: CreateComponent
  destroyComponent?: DestroyComponent
  placementComponent?: PlacementComponent
  positionComponent?: PositionComponent
  randomColorFillComponent?: RandomColorFillComponent
  rotationComponent?: RotationComponent
  velocityComponent?: VelocityComponent
}

// entities
export const entities = [
  import('./entities/container.entity'),
  import('./entities/fullscreen.entity'),
  import('./entities/loading.entity'),
  import('./entities/sprite.entity'),
  import('./entities/text.entity'),
]

// systems
export const systemClasses = [
  CollisionSystem,
  BoundsCollisionSystem,
  CollisionSystem,
  ContainerClickableSystem,
  CreateSystem,
  DestroySystem,
  MoveSystem,
  PlacementSystem,
  RandomColorFillSystem,
  RotationSystem,
]
