import "@esengine/g-framework";
import type { BaseEntity } from "../entities/base-entity";

export abstract class BaseComponent extends gs.Component {
  protected get pixiComp() {
    const ee = this.entity as BaseEntity;
    return ee.pixiComp;
  }
}
