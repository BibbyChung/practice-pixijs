import "@esengine/g-framework";
import type { Container } from "pixi.js";
import { EnumContainerLabel } from "../common/utils";

export abstract class BaseEntity extends gs.Entity {
  public pixiComp?: Container;
  public parentContainerName: EnumContainerLabel = EnumContainerLabel.none;
  public zIndex = 10;
  abstract onCreate(): void;
  abstract onDestroy(): void;
}
