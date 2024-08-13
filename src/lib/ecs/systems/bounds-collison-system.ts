import { tap } from 'rxjs'
import { getTickerLoop } from '../../pixi-application'
import { BaseSystem } from './base-system'

export class BoundsCollisionSystem extends BaseSystem {
  protected getQuery() {
    return this._ge.miniplexECS
      .without('createComponent')
      .with('boundsCollisionComponent')
      .with('collisionComponent')
      .with('moveComponent').onEntityAdded
  }
  execute(): void {
    this.getQuery().subscribe((comp) => {
      const pixiElem = comp.collisionComponent.entity.pixiElem!
      const compBounds = comp.collisionComponent.bounds
      const sub = getTickerLoop()
        .pipe(
          tap((delte) => {
            const sourceLeftX = pixiElem.position.x - compBounds.width / 2
            const sourceRightX = pixiElem.position.x + compBounds.width / 2
            const sourceTopY = pixiElem.position.y - compBounds.height / 2
            const sourceBottomY = pixiElem.position.y + compBounds.height / 2

            // screen bound collision
            if (sourceLeftX < comp.boundsCollisionComponent.left) {
              comp.moveComponent.velocityX = Math.abs(comp.moveComponent.velocityX)
            }

            if (sourceRightX > comp.boundsCollisionComponent.right) {
              comp.moveComponent.velocityX = Math.abs(comp.moveComponent.velocityX) * -1
            }

            if (sourceTopY < comp.boundsCollisionComponent.top) {
              comp.moveComponent.velocityY = Math.abs(comp.moveComponent.velocityY)
            }

            if (sourceBottomY > comp.boundsCollisionComponent.bottom) {
              comp.moveComponent.velocityY = Math.abs(comp.moveComponent.velocityY) * -1
            }
          })
        )
        .subscribe()
    })
  }
}
