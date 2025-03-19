import type { Rect } from '@timohausmann/quadtree-js'
import { tap } from 'rxjs'
import { isRectangleCollision } from '../../common/utils'
import type { ComponentType } from '../_index'
import type { BaseEntity } from '../entities/base.entity'
import { BaseSystem } from './base.system'

export class CollisionSystem extends BaseSystem {
  private get q() {
    return this.ecs.world
      .without('createComponent')
      .with('positionComponent')
      .with('velocityComponent')
      .with('collisionComponent')
  }
  protected getAddedQuery() {
    return this.q.onEntityAdded
  }
  protected getRemovedQuery() {
    return this.q.onEntityRemoved
  }

  execute(): void {
    this.getAddedQuery().subscribe((entity) => {
      const baseEntity = entity as ComponentType as BaseEntity
      this.subs.push(
        this.pixiApp
          .getTickerCollisionQTreeLoop()
          .pipe(
            tap(({ delta, qTree }) => {
              // check for destruction
              // if (entity.destroyComponent?.isDestroy ?? false) {
              //   setDestroySub(sub)
              //   return
              // }

              const sourceBound = entity.collisionComponent.bounds
              const sourceLeftX = entity.positionComponent.x - sourceBound.width / 2
              const sourceRightX = entity.positionComponent.x + sourceBound.width / 2
              const sourceTopY = entity.positionComponent.y - sourceBound.height / 2
              const sourceBottomY = entity.positionComponent.y + sourceBound.height / 2

              // many to many collision
              const targetEntitiesQuery = qTree.retrieve<Rect & { comp: ComponentType }>(
                entity.collisionComponent.bounds
              )
              if (targetEntitiesQuery.length === 0) {
                return
              }

              // console.log(targetEntitiesQuery.length);
              for (const treeEntity of targetEntitiesQuery) {
                const targetBaseEntity = treeEntity.comp as ComponentType as BaseEntity
                if (baseEntity.ecsEntityId === targetBaseEntity.ecsEntityId) {
                  continue
                }

                const targetPixiElem = targetBaseEntity.pixiElem!
                const targetEntityBound = treeEntity.comp.collisionComponent!.bounds

                if (
                  !entity.collisionComponent.isCollision &&
                  isRectangleCollision(sourceBound, targetEntityBound)
                ) {
                  // change direction
                  entity.collisionComponent.isCollision = true

                  const targetLeftX = targetPixiElem.position.x - targetEntityBound.width / 2
                  const targetRightX = targetPixiElem.position.x + targetEntityBound.width / 2
                  const targetTopY = targetPixiElem.position.y - targetEntityBound.height / 2
                  const targetBottomY = targetPixiElem.position.y + targetEntityBound.height / 2

                  if (sourceRightX > targetRightX || sourceRightX < 0) {
                    entity.velocityComponent.speed.x = Math.abs(entity.velocityComponent.speed.y)
                  }
                  if (sourceLeftX < targetLeftX || sourceLeftX > this.pixiApp.app.screen.width) {
                    entity.velocityComponent.speed.x =
                      Math.abs(entity.velocityComponent.speed.x) * -1
                  }

                  if (sourceBottomY > targetBottomY || sourceBottomY < 0) {
                    entity.velocityComponent.speed.y = Math.abs(entity.velocityComponent.speed.y)
                  }
                  if (sourceTopY < targetTopY || sourceTopY > this.pixiApp.app.screen.height) {
                    entity.velocityComponent.speed.y =
                      Math.abs(entity.velocityComponent.speed.y) * -1
                  }

                  entity.collisionComponent.isCollision = false
                }
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
