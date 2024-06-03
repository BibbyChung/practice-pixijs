import { tap } from "rxjs";
import { setDestroySub } from "../../common/utils";
import { getTickerLoop } from "../../pixi-application";
import type { BaseEntity } from "../entities/base-entity";
import { BaseSystem } from "./base-system";

export class MoveSystem extends BaseSystem {
  protected getQuery() {
    return this._ge.miniplexECS.without("createComponent").with("moveComponent")
      .onEntityAdded;
  }
  execute(): void {
    this.getQuery().subscribe((entity) => {
      const ee = entity as any as BaseEntity;
      const pixiElem = ee.pixiElem;
      if (pixiElem) {
        const sub = getTickerLoop()
          .pipe(
            tap((delta) => {
              // check for destruction
              if (entity.destroyComponent?.isDestroy ?? false) {
                setDestroySub(sub);
                return;
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
