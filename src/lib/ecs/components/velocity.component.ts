import type { BaseEntity } from '../entities/base.entity'
import { BaseComponent } from './base.component'

export class VelocityComponent extends BaseComponent {
  speed = {
    x: 0,
    y: 0,
  }

  constructor(
    public entity: BaseEntity,
    public velocity: number,
    public targetX: number,
    public targetY: number
  ) {
    super(entity)
  }
}
