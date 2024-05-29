import "@esengine/g-framework";
import { BaseComponent } from "./base-component";

export class PositionComponent extends BaseComponent {
  public get x(): number {
    return this.pixiComp?.x ?? 0;
  }
  public set x(value: number) {
    if (this.pixiComp) {
      this.pixiComp.x = value;
    }
  }
  public get y(): number {
    return this.pixiComp?.y ?? 0;
  }
  public set y(value: number) {
    if (this.pixiComp) {
      this.pixiComp.y = value;
    }
  }

  public reset() {
    this.x = 0;
    this.y = 0;
  }
}
