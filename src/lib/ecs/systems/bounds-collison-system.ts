import { tap } from 'rxjs'
import { BaseSystem } from './base-system'

export class BoundsCollisionSystem extends BaseSystem {
  private get q() {
    return this.ecs.world
      .without('createComponent')
      .with('boundsCollisionComponent')
      .with('collisionComponent')
      .with('positionComponent')
      .with('moveComponent')
  }
  protected getAddedQuery() {
    return this.q.onEntityAdded
  }
  protected getRemovedQuery() {
    return this.q.onEntityRemoved
  }
  execute(): void {
    this.getAddedQuery().subscribe((entity) => {
      const compBounds = entity.collisionComponent.bounds
      this.subs.push(
        this.pixiApp
          .getTickerCollisionQTreeLoop()
          .pipe(
            tap((delte) => {
              const sourceLeftX = entity.positionComponent.x - compBounds.width / 2
              const sourceRightX = entity.positionComponent.x + compBounds.width / 2
              const sourceTopY = entity.positionComponent.y - compBounds.height / 2
              const sourceBottomY = entity.positionComponent.y + compBounds.height / 2

              // screen bound collision
              if (sourceLeftX < entity.boundsCollisionComponent.left) {
                entity.moveComponent.velocityX = Math.abs(entity.moveComponent.velocityX)
              }

              if (sourceRightX > entity.boundsCollisionComponent.right) {
                entity.moveComponent.velocityX = Math.abs(entity.moveComponent.velocityX) * -1
              }

              if (sourceTopY < entity.boundsCollisionComponent.top) {
                entity.moveComponent.velocityY = Math.abs(entity.moveComponent.velocityY)
              }

              if (sourceBottomY > entity.boundsCollisionComponent.bottom) {
                entity.moveComponent.velocityY = Math.abs(entity.moveComponent.velocityY) * -1
              }
            })
          )
          .subscribe()
      )
    })

    this.getRemovedQuery().subscribe((entity) => {
      this.subs.forEach((item) => item.unsubscribe())
    })
  }
}
