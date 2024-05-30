import type { EnumContainerLabel } from "../common/utils";
import { BaseComponent, ComponentType } from "./base-component";

export class PlacementComponent extends BaseComponent {
  constructor(
    protected comp: ComponentType,
    public parentLabel: EnumContainerLabel,
    public zIndex: number
  ) {
    super(comp);
  }
}
