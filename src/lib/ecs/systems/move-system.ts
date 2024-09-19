import { tap } from 'rxjs'
import { BaseSystem } from './base-system'

export class MoveSystem extends BaseSystem {
  private get q() {
    return this.ecs.world.without('createComponent').with('positionComponent').with('moveComponent')
  }
  protected getAddedQuery() {
    return this.q.onEntityAdded
  }
  protected getRemovedQuery() {
    return this.q.onEntityRemoved
  }

  execute(): void {
    this.getAddedQuery().subscribe((entity) => {
      this.subs.push(
        this.pixiApp
          .getTickerLoop()
          .pipe(
            tap((delta) => {
              const newX =
                entity.positionComponent.x + entity.moveComponent.velocityX * delta.deltaTime
              const newY =
                entity.positionComponent.y + entity.moveComponent.velocityY * delta.deltaTime
              entity.positionComponent.x = newX
              entity.positionComponent.y = newY
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
