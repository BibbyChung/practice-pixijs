import type { BaseEntity } from '../entities/base-entity'
import type { ContainerLabelType } from '../entities/container-entity'
import { BaseComponent } from './base-component'

export class PlacementComponent extends BaseComponent {
  constructor(
    public entity: BaseEntity,
    public parentLabel: ContainerLabelType,
    public zIndex: number
  ) {
    super(entity)
  }
}
