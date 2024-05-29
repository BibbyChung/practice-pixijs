import type { BaseEntity } from "../entities/base-entity";

export abstract class BaseComponent {
  constructor(protected entity: BaseEntity) {}
}
