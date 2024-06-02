import type { Rect } from "@timohausmann/quadtree-js";
import { tap } from "rxjs";
import { isRectangleCollision, setDestroySub } from "../common/utils";
import type { BaseEntity } from "../entities/base-entity";
import { getTickerCollisionQTreeLoop } from "../game-engine";
import { BaseSystem } from "./base-system";

export class CollisionSystem extends BaseSystem {
  protected getQuery() {
    return this._ge.miniplexECS
      .without("createComponent")
      .with("moveComponent")
      .with("collisionComponent").onEntityAdded;
  }

  execute(): void {
    this.getQuery().subscribe((sourceEntity) => {
      const sourceBaseEntity = sourceEntity as BaseEntity;
      if (sourceBaseEntity.pixiElem) {
        const sub = getTickerCollisionQTreeLoop()
          .pipe(
            tap(({ delta, qTree }) => {
              // check for destruction
              if (sourceEntity.destroyComponent?.isDestroy ?? false) {
                setDestroySub(sub);
                return;
              }

              const targetEntitiesQuery = qTree.retrieve<
                Rect & { entity: BaseEntity }
              >(sourceEntity.collisionComponent.bounds);
              if (!targetEntitiesQuery) {
                return;
              }

              // console.log(targetEntitiesQuery.length);
              for (const treeEntity of targetEntitiesQuery) {
                const targetEntity = treeEntity.entity;
                const targetBaseEntity = targetEntity as BaseEntity;
                if (
                  sourceBaseEntity.ecsEntityId === targetBaseEntity.ecsEntityId
                ) {
                  continue;
                }

                const sourcePixiElem = sourceBaseEntity.pixiElem!;
                const sourceEntityBound =
                  sourceEntity.collisionComponent.bounds;

                const targetPixiElem = targetBaseEntity.pixiElem!;
                const targetEntityBound =
                  targetEntity!.collisionComponent!.bounds;

                if (
                  !sourceEntity.collisionComponent.isCollision &&
                  isRectangleCollision(sourceEntityBound, targetEntityBound)
                ) {
                  // change direction
                  sourceEntity.collisionComponent.isCollision = true;

                  const selfMaxX =
                    sourcePixiElem.position.x + sourceEntityBound.width / 2;
                  const selfMinX =
                    sourcePixiElem.position.x - sourceEntityBound.width / 2;
                  const selfMaxY =
                    sourcePixiElem.position.y + sourceEntityBound.height / 2;
                  const selfMinY =
                    sourcePixiElem.position.y - sourceEntityBound.height / 2;

                  const targetMaxX =
                    targetPixiElem.position.x + targetEntityBound.width / 2;
                  const targetMinX =
                    targetPixiElem.position.x - targetEntityBound.width / 2;
                  const targetMaxY =
                    targetPixiElem.position.y + targetEntityBound.height / 2;
                  const targetMinY =
                    targetPixiElem.position.y - targetEntityBound.height / 2;

                  if (selfMaxX > targetMaxX) {
                    sourceEntity.moveComponent.velocityX = Math.abs(
                      sourceEntity.moveComponent.velocityX
                    );
                  }
                  if (selfMinX < targetMinX) {
                    sourceEntity.moveComponent.velocityX =
                      Math.abs(sourceEntity.moveComponent.velocityX) * -1;
                  }

                  if (selfMaxY > targetMaxY) {
                    sourceEntity.moveComponent.velocityY = Math.abs(
                      sourceEntity.moveComponent.velocityY
                    );
                  }
                  if (selfMinY < targetMinY) {
                    sourceEntity.moveComponent.velocityY =
                      Math.abs(sourceEntity.moveComponent.velocityY) * -1;
                  }

                  sourceEntity.collisionComponent.isCollision = false;
                }
              }
            })
          )
          .subscribe();
      }
    });
  }
}
