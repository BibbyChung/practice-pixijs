import { getRandomRGBA } from "./../../common/utils";
import { BaseComponent } from "./base-component";

export class RandomColorFillComponent extends BaseComponent {
  defaultColor = getRandomRGBA();
}
