import { EnumContainerLabel } from "../components/_index";
import { BaseSystem } from "./base-system";

export class MoveupSystem extends BaseSystem {
  protected getQuery() {
    return this._ge.miniplexECS
      .with("isInited", "velocity")
      .where((e) => !e.isInited).onEntityAdded;
  }
  init(): void {
    this.getQuery().subscribe((e) => {
      this._ge.pixiApp.ticker.add((delta) => {
        if (e.self) {
          const entityBound = e.self!.getBounds();
          const maxX = e.position!.x + entityBound.width / 2;
          const minX = e.position!.x - entityBound.width / 2;
          const maxY = e.position!.y + entityBound.height / 2;
          const minY = e.position!.y - entityBound.height / 2;

          const bX = this._ge.screenWitdh;
          const bY = this._ge.screenHeight;

          if (minX < 0 || maxX > bX) {
            e.velocity.x = e.velocity.x * -1;
          }

          if (minY < 0 || maxY > bY) {
            e.velocity.y = e.velocity.y * -1;
          }

          const newX = e.position!.x + e.velocity.x * delta.deltaTime;
          const newY = e.position!.y + e.velocity.y * delta.deltaTime;

          e.position?.set(newX, newY);
        }
      });
    });
  }
}
