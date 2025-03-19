import { tap } from 'rxjs'
import { BaseSystem } from './base.system'

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
      // 假设 angle 是物体要移动的方向（以弧度为单位）
      let angle = Math.atan2(
        entity.velocityComponent.targetY - entity.positionComponent.y,
        entity.velocityComponent.targetX - entity.positionComponent.x
      )
      // 使用角度计算 x 和 y 的速度分量
      entity.velocityComponent.speed.x = entity.velocityComponent.velocity * Math.cos(angle)
      entity.velocityComponent.speed.y = entity.velocityComponent.velocity * Math.sin(angle)

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
