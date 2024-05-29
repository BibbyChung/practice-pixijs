import "@esengine/g-framework";
import { BaseComponent } from "./base-component";

export class ContainerComponent extends BaseComponent {
  get containerLabel() {
    return this.pixiComp?.label;
  }
}
