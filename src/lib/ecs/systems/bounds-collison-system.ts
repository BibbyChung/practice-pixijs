import { tap } from 'rxjs'
import { BaseSystem } from './base-system'

export class BoundsCollisionSystem extends BaseSystem {
  private get q() {
    return this.ecs.world
      .without('createComponent')
      .with('boundsCollisionComponent')
      .with('collisionComponent')
      .with('positionComponent')
      .with('velocityComponent')
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
                entity.velocityComponent.speed.x = Math.abs(entity.velocityComponent.speed.x)
              }

              if (sourceRightX > entity.boundsCollisionComponent.right) {
                entity.velocityComponent.speed.x = Math.abs(entity.velocityComponent.speed.x) * -1
              }

              if (sourceTopY < entity.boundsCollisionComponent.top) {
                entity.velocityComponent.speed.y = Math.abs(entity.velocityComponent.speed.y)
              }

              if (sourceBottomY > entity.boundsCollisionComponent.bottom) {
                entity.velocityComponent.speed.y = Math.abs(entity.velocityComponent.speed.y) * -1
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
