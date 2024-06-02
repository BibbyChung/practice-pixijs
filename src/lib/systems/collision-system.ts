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

              const sourcePixiElem = sourceBaseEntity.pixiElem!;
              const sourceEntityBound = sourceEntity.collisionComponent.bounds;

              const sourceLeftX =
                sourcePixiElem.position.x - sourceEntityBound.width / 2;
              const sourceRightX =
                sourcePixiElem.position.x + sourceEntityBound.width / 2;
              const sourceTopY =
                sourcePixiElem.position.y - sourceEntityBound.height / 2;
              const sourceBottomY =
                sourcePixiElem.position.y + sourceEntityBound.height / 2;

              // screen bound collision
              if (sourceLeftX < 0) {
                sourceEntity.moveComponent.velocityX = Math.abs(
                  sourceEntity.moveComponent.velocityX
                );
              }

              if (sourceRightX > this._ge.screenWitdh) {
                sourceEntity.moveComponent.velocityX =
                  Math.abs(sourceEntity.moveComponent.velocityX) * -1;
              }

              if (sourceTopY < 0) {
                sourceEntity.moveComponent.velocityY = Math.abs(
                  sourceEntity.moveComponent.velocityY
                );
              }

              if (sourceBottomY > this._ge.screenHeight) {
                sourceEntity.moveComponent.velocityY =
                  Math.abs(sourceEntity.moveComponent.velocityY) * -1;
              }

              // many to many collision
              const targetEntitiesQuery = qTree.retrieve<
                Rect & { entity: BaseEntity }
              >(sourceEntity.collisionComponent.bounds);
              if (targetEntitiesQuery.length === 0) {
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

                const targetPixiElem = targetBaseEntity.pixiElem!;
                const targetEntityBound =
                  targetEntity!.collisionComponent!.bounds;

                if (
                  !sourceEntity.collisionComponent.isCollision &&
                  isRectangleCollision(sourceEntityBound, targetEntityBound)
                ) {
                  // change direction
                  sourceEntity.collisionComponent.isCollision = true;

                  const targetLeftX =
                    targetPixiElem.position.x - targetEntityBound.width / 2;
                  const targetRightX =
                    targetPixiElem.position.x + targetEntityBound.width / 2;
                  const targetTopY =
                    targetPixiElem.position.y - targetEntityBound.height / 2;
                  const targetBottomY =
                    targetPixiElem.position.y + targetEntityBound.height / 2;

                  if (sourceRightX > targetRightX || sourceRightX < 0) {
                    sourceEntity.moveComponent.velocityX = Math.abs(
                      sourceEntity.moveComponent.velocityX
                    );
                  }
                  if (
                    sourceLeftX < targetLeftX ||
                    sourceLeftX > this._ge.screenWitdh
                  ) {
                    sourceEntity.moveComponent.velocityX =
                      Math.abs(sourceEntity.moveComponent.velocityX) * -1;
                  }

                  if (sourceBottomY > targetBottomY || sourceBottomY < 0) {
                    sourceEntity.moveComponent.velocityY = Math.abs(
                      sourceEntity.moveComponent.velocityY
                    );
                  }
                  if (
                    sourceTopY < targetTopY ||
                    sourceTopY > this._ge.screenHeight
                  ) {
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
