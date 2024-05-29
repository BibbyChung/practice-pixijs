import type { EnumContainerLabel } from "../common/utils";
import type { BaseEntity } from "../entities/base-entity";
import { BaseComponent } from "./base-component";

export class PlacementComponent extends BaseComponent {
  constructor(
    protected entity: BaseEntity,
    public parentLabel: EnumContainerLabel,
    public zIndex: number
  ) {
    super(entity);
  }
}
