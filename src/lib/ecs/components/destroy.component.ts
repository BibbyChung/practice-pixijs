import { BaseComponent } from './base.component'

export class DestroyComponent extends BaseComponent {
  isDestroy = false

  destroy() {
    this.entity.destroy()
  }
}
