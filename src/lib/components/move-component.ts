import type { BaseEntity } from "../entities/base-entity";
import { BaseComponent } from "./base-component";

export class MoveComponent extends BaseComponent {
  constructor(
    protected entity: BaseEntity,
    public velocityX: number,
    public velocityY: number
  ) {
    super(entity);
  }
}
