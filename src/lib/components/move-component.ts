import type { BaseEntity } from "../entities/base-entity";
import { BaseComponent, ComponentType } from "./base-component";

export class MoveComponent extends BaseComponent {
  constructor(
    protected comp: ComponentType,
    public velocityX: number,
    public velocityY: number
  ) {
    super(comp);
  }
}
