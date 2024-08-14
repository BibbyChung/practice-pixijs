import type { Rect } from '@timohausmann/quadtree-js'
import { tap } from 'rxjs'
import type { ComponentType } from '../_index'
import { isRectangleCollision, setDestroySub } from '../../common/utils'
import { getTickerCollisionQTreeLoop } from '../../game-engine'
import { BaseSystem } from './base-system'

export class CollisionSystem extends BaseSystem {
  protected getQuery() {
    return this._ge.miniplexECS
      .without('createComponent')
      .with('moveComponent')
      .with('collisionComponent').onEntityAdded
  }

  execute(): void {
    this.getQuery().subscribe((comp) => {
      const sourceBaseEntity = comp.collisionComponent.entity
      const sourcePixiElem = sourceBaseEntity.pixiElem!
      const sub = getTickerCollisionQTreeLoop()
        .pipe(
          tap(({ delta, qTree }) => {
            // check for destruction
            if (comp.destroyComponent?.isDestroy ?? false) {
              setDestroySub(sub)
              return
            }

            const sourceBound = comp.collisionComponent.bounds

            const sourceLeftX = sourcePixiElem.position.x - sourceBound.width / 2
            const sourceRightX = sourcePixiElem.position.x + sourceBound.width / 2
            const sourceTopY = sourcePixiElem.position.y - sourceBound.height / 2
            const sourceBottomY = sourcePixiElem.position.y + sourceBound.height / 2

            // many to many collision
            const targetEntitiesQuery = qTree.retrieve<Rect & { comp: ComponentType }>(
              comp.collisionComponent.bounds
            )
            if (targetEntitiesQuery.length === 0) {
              return
            }

            // console.log(targetEntitiesQuery.length);
            for (const treeEntity of targetEntitiesQuery) {
              const targetBaseEntity = treeEntity.comp.collisionComponent!.entity
              if (sourceBaseEntity.ecsEntityId === targetBaseEntity.ecsEntityId) {
                continue
              }

              const targetPixiElem = targetBaseEntity.pixiElem!
              const targetEntityBound = treeEntity.comp.collisionComponent!.bounds

              if (
                !comp.collisionComponent.isCollision &&
                isRectangleCollision(sourceBound, targetEntityBound)
              ) {
                // change direction
                comp.collisionComponent.isCollision = true

                const targetLeftX = targetPixiElem.position.x - targetEntityBound.width / 2
                const targetRightX = targetPixiElem.position.x + targetEntityBound.width / 2
                const targetTopY = targetPixiElem.position.y - targetEntityBound.height / 2
                const targetBottomY = targetPixiElem.position.y + targetEntityBound.height / 2

                if (sourceRightX > targetRightX || sourceRightX < 0) {
                  comp.moveComponent.velocityX = Math.abs(comp.moveComponent.velocityX)
                }
                if (sourceLeftX < targetLeftX || sourceLeftX > this._ge.designWidth) {
                  comp.moveComponent.velocityX = Math.abs(comp.moveComponent.velocityX) * -1
                }

                if (sourceBottomY > targetBottomY || sourceBottomY < 0) {
                  comp.moveComponent.velocityY = Math.abs(comp.moveComponent.velocityY)
                }
                if (sourceTopY < targetTopY || sourceTopY > this._ge.designHeight) {
                  comp.moveComponent.velocityY = Math.abs(comp.moveComponent.velocityY) * -1
                }

                comp.collisionComponent.isCollision = false
              }
            }
          })
        )
        .subscribe()
    })
  }
}
