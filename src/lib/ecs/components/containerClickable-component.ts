import type { FederatedPointerEvent } from 'pixi.js'
import type { BaseEntity } from '../entities/base-entity'
import { BaseComponent } from './base-component'

export class ContainerClickableComponent extends BaseComponent {
  constructor(
    entity: BaseEntity,
    public clickableWidth: number,
    public clickableHeight: number,
    public cursor: 'none' | 'pointer',
    public onClick: (event: FederatedPointerEvent) => void
  ) {
    super(entity)
  }
}
