import { BaseSystem } from "./base-system";

export class MoveSystem extends BaseSystem {
  protected getQuery() {
    return this._ge.miniplexECS.without("createComponent").with("moveComponent")
      .onEntityAdded;
  }
  execute(): void {
    this.getQuery().subscribe((entity) => {
      const pixiElem = entity.pixiElem;
      if (pixiElem) {
        const tickerObj = this._ge.pixiApp.ticker.add((delta) => {
          // check for destruction
          if (entity.destroyComponent?.isDestroy ?? false) {
            tickerObj.stop();
            return;
          }

          const entityBound = pixiElem.getBounds();
          const maxX = pixiElem.position.x + entityBound.width / 2;
          const minX = pixiElem.position.x - entityBound.width / 2;
          const maxY = pixiElem.position.y + entityBound.height / 2;
          const minY = pixiElem.position.y - entityBound.height / 2;

          const bX = this._ge.screenWitdh;
          const bY = this._ge.screenHeight;

          if (minX < 0 || maxX > bX) {
            entity.moveComponent.velocityX =
              entity.moveComponent.velocityX * -1;
          }

          if (minY < 0 || maxY > bY) {
            entity.moveComponent.velocityY =
              entity.moveComponent.velocityY * -1;
          }

          const newX =
            pixiElem.position.x +
            entity.moveComponent.velocityX * delta.deltaTime;
          const newY =
            pixiElem.position.y +
            entity.moveComponent.velocityY * delta.deltaTime;

          pixiElem.position.set(newX, newY);
        });
      }
    });
  }
}
