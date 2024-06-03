import { tap } from "rxjs";
import { setDestroySub } from "../../common/utils";
import { getTickerLoop } from "../../pixi-application";
import { BaseSystem } from "./base-system";

export class MoveSystem extends BaseSystem {
  protected getQuery() {
    return this._ge.miniplexECS.without("createComponent").with("moveComponent")
      .onEntityAdded;
  }
  execute(): void {
    this.getQuery().subscribe((comp) => {
      const entity = comp.moveComponent.entity;
      const pixiElem = entity.pixiElem;
      if (pixiElem) {
        const sub = getTickerLoop()
          .pipe(
            tap((delta) => {
              // check for destruction
              if (comp.destroyComponent?.isDestroy ?? false) {
                setDestroySub(sub);
                return;
              }

              const newX =
                pixiElem.position.x +
                comp.moveComponent.velocityX * delta.deltaTime;
              const newY =
                pixiElem.position.y +
                comp.moveComponent.velocityY * delta.deltaTime;

              pixiElem.position.set(newX, newY);
            })
          )
          .subscribe();
      }
    });
  }
}
