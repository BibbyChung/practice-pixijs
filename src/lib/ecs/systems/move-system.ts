import { tap } from 'rxjs'
import { BaseSystem } from './base-system'

export class MoveSystem extends BaseSystem {
  private get q() {
    return this.ecs.world
      .without('createComponent')
      .with('positionComponent')
      .with('velocityComponent')
      .with('rotationComponent')
  }
  protected getAddedQuery() {
    return this.q.onEntityAdded
  }
  protected getRemovedQuery() {
    return this.q.onEntityRemoved
  }

  execute(): void {
    this.getAddedQuery().subscribe((entity) => {
      entity.velocityComponent.speed.x = Math.cos(entity.velocityComponent.velocity) * 5
      entity.velocityComponent.speed.y = Math.sin(entity.velocityComponent.velocity) * 5

      this.subs.push(
        this.pixiApp
          .getTickerLoop()
          .pipe(
            tap((delta) => {
              const newX =
                entity.positionComponent.x + entity.velocityComponent.speed.x * delta.deltaTime
              const newY =
                entity.positionComponent.y + entity.velocityComponent.speed.y * delta.deltaTime
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
