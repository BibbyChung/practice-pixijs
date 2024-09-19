import { BaseComponent } from './base-component'

export class CreateComponent extends BaseComponent {
  async create() {
    await this.entity.create()
  }
}
