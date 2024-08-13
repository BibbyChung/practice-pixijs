import { BaseComponent } from './base-component'

export class ContainerComponent extends BaseComponent {
  get label() {
    return this.entity.pixiElem?.label
  }
}
