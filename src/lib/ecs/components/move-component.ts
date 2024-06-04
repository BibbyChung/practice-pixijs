import type { BaseEntity } from "../entities/base-entity";
import { BaseComponent } from "./base-component";

export class MoveComponent extends BaseComponent {
  // vx: Math.cos(props.dummy.ang) * props.dummy.v,
  // vy: Math.sin(props.dummy.ang) * props.dummy.v
  constructor(
    public entity: BaseEntity,
    public velocityX: number,
    public velocityY: number
  ) {
    super(entity);
  }
}
