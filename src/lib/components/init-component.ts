import "@esengine/g-framework";
import type { EnumContainerLabel } from "../common/utils";
import type { BaseEntity } from "../entities/base-entity";
import { BaseComponent } from "./base-component";

export class InitComponent extends BaseComponent {
  public get parentContainerName(): EnumContainerLabel {
    const be = this.entity as BaseEntity;
    return be.parentContainerName;
  }
  public get zIndex() {
    const bc = this.entity as BaseEntity;
    return bc.zIndex;
  }
}
