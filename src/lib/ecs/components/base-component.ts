import type { BaseEntity } from "../entities/base-entity";

export abstract class BaseComponent {
  constructor(public entity: BaseEntity) {}
}
