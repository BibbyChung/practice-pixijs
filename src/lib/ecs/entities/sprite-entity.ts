import { FederatedPointerEvent, Sprite } from 'pixi.js'
import { switchMap, tap } from 'rxjs'
import { getRandomInt, getSubject } from '~/lib/common/utils'
import { getMiniECS } from '~/lib/services/miniECS.service'
import { getPixiApp } from '~/lib/services/pixiApp.service'
import { getComponentKV } from '../_index'
import { BoundsCollisionComponent } from '../components/bounds-collision-compoent'
import { CollisionComponent } from '../components/collision-component'
import { CreateComponent } from '../components/create-component'
import { PlacementComponent } from '../components/placement-component'
import { PositionComponent } from '../components/position-component'
import { RotationComponent } from '../components/rotation-component'
import { VelocityComponent } from '../components/velocity-component'
import { BaseEntity } from './base-entity'
import { getGameContainerClickEvent } from './container-entity'

class SpriteEntity extends BaseEntity {
  constructor(
    private scale: number = 1,
    private positionX: number = 0,
    private positionY: number = 0
  ) {
    super()
  }

  create(): void | Promise<void> {
    const assets = this.pixiApp.getGameScreenAssets()

    const sp = Sprite.from(assets['/game/game-screen/ghost'])
    this.pixiElem = sp
    sp.position.set(this.positionX, this.positionY)
    sp.anchor.set(0.5)
    sp.scale.set(this.scale)
    // sp.interactive = true

    sp.addEventListener('pointertap', this.clickIt.bind(this))

    this.pixiElem = sp
  }

  clickIt(event: FederatedPointerEvent) {
    const bounds = this.pixiElem!.getBounds()
    console.log(`x:${bounds.x}, y:${bounds.y}, width:${bounds.width}, heigh:${bounds.height}`)

    // destroy entity
    // const self = this._ge.miniplexECS.entity(this.ecsEntityId ?? 0);
    // if (self) {
    //   this._ge.addComponent(
    //     self,
    //     "destroyComponent",
    //     new DestroyComponent(self)
    //   );
    // }
  }
}

const isReady = getSubject<boolean>()
export const init = () => isReady.next(true)

// create sprite
isReady
  .pipe(
    switchMap(() => getGameContainerClickEvent()),
    tap((event) => {
      Array.from(Array(3).keys()).forEach((item) => {
        createSpite(event)
      })
    })
  )
  .subscribe()

const createSpite = (event: FederatedPointerEvent) => {
  const pixiApp = getPixiApp()
  const ecs = getMiniECS()
  const positionX = pixiApp.getCanvasClientX(event.client.x)
  const positionY = pixiApp.getCanvasClientY(event.client.y)
  const targetX = getRandomInt(-10000, 10000)
  const targetY = getRandomInt(-10000, 10000)
  const scale = getRandomInt(1, 3) / 10
  const v = getRandomInt(20, 80) / 10

  const entity = new SpriteEntity(scale, positionX, positionY)
  const componentKV = getComponentKV({
    createComponent: new CreateComponent(entity),
    placementComponent: new PlacementComponent(entity, 'game', 0),
    positionComponent: new PositionComponent(entity),
    velocityComponent: new VelocityComponent(entity, v, targetX, targetY),
    collisionComponent: new CollisionComponent(entity),
    boundsCollisionComponent: new BoundsCollisionComponent(entity),
    rotationComponent: new RotationComponent(entity),
  })
  ecs.addEntityWithComponent(entity, componentKV)
}
