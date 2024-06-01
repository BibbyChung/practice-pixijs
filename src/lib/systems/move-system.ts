import { BaseSystem } from "./base-system";
import type { BaseEntity } from "../entities/base-entity";
import { getTicker } from "../pixi-application";
import { tap } from "rxjs";
import { setDestroySub } from "../common/utils";

export class MoveSystem extends BaseSystem {
  protected getQuery() {
    return this._ge.miniplexECS.without("createComponent").with("moveComponent")
      .onEntityAdded;
  }
  execute(): void {
    this.getQuery().subscribe((entity) => {
      const ee = entity as BaseEntity;
      const pixiElem = ee.pixiElem;
      if (pixiElem) {
        const sub = getTicker()
          .pipe(
            tap((delta) => {
              // check for destruction
              if (entity.destroyComponent?.isDestroy ?? false) {
                // this._ge.pixiApp.ticker.remove(func);
                setDestroySub(sub);
                return;
              }

              const entityBound = pixiElem.getBounds();
              const maxX = pixiElem.position.x + entityBound.width / 2;
              const minX = pixiElem.position.x - entityBound.width / 2;
              const maxY = pixiElem.position.y + entityBound.height / 2;
              const minY = pixiElem.position.y - entityBound.height / 2;

              const bX = this._ge.screenWitdh;
              const bY = this._ge.screenHeight;

              if (minX < 0) {
                entity.moveComponent.velocityX = Math.abs(
                  entity.moveComponent.velocityX
                );
              }
              if (maxX > bX) {
                entity.moveComponent.velocityX =
                  Math.abs(entity.moveComponent.velocityX) * -1;
              }

              if (minY < 0) {
                entity.moveComponent.velocityY = Math.abs(
                  entity.moveComponent.velocityY
                );
              }

              if (maxY > bY) {
                entity.moveComponent.velocityY =
                  Math.abs(entity.moveComponent.velocityY) * -1;
              }

              const newX =
                pixiElem.position.x +
                entity.moveComponent.velocityX * delta.deltaTime;
              const newY =
                pixiElem.position.y +
                entity.moveComponent.velocityY * delta.deltaTime;

              pixiElem.position.set(newX, newY);
            })
          )
          .subscribe();
      }
    });
  }
}
