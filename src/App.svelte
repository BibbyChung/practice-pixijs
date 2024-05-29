<script lang="ts">
  import { onMount } from "svelte";
  import { EnumContainerLabel } from "./lib/common/utils";
  import { ContainerComponent } from "./lib/components/container-component";
  import { CreateComponent } from "./lib/components/create-component";
  import { MoveComponent } from "./lib/components/move-component";
  import { PlacementComponent } from "./lib/components/placement-component";
  import { ButtonEntity } from "./lib/entities/button-entity";
  import { RootContainerEntity } from "./lib/entities/root-container-entity";
  import { TextEntity } from "./lib/entities/text-entity";
  import { getGameEngine, initGameEngine } from "./lib/game-engine";

  let mainElem: HTMLElement;

  onMount(async () => {
    const _w = window;

    await initGameEngine(mainElem, _w);

    const world = getGameEngine();

    const rootContainer01 = new RootContainerEntity();
    world.addEntity(rootContainer01);
    world.addComponent(
      rootContainer01,
      "createComponent",
      new CreateComponent(rootContainer01)
    );
    world.addComponent(
      rootContainer01,
      "containerComponent",
      new ContainerComponent(rootContainer01)
    );
    world.addComponent(
      rootContainer01,
      "placementComponent",
      new PlacementComponent(rootContainer01, EnumContainerLabel.none, 0)
    );

    // 創建一個文字
    const textObj01 = new TextEntity("Hello, Pixi!", {
      fontSize: 48,
      fill: "white",
      align: "center",
    });
    world.addEntity(textObj01);
    world.addComponent(
      textObj01,
      "createComponent",
      new CreateComponent(textObj01)
    );
    world.addComponent(
      textObj01,
      "placementComponent",
      new PlacementComponent(textObj01, EnumContainerLabel.root, 20)
    );

    // 創建一個 button
    const button01 = new ButtonEntity();
    world.addEntity(button01);
    world.addComponent(
      button01,
      "createComponent",
      new CreateComponent(button01)
    );
    world.addComponent(
      button01,
      "placementComponent",
      new PlacementComponent(button01, EnumContainerLabel.root, 10)
    );
    world.addComponent(
      button01,
      "moveComponent",
      new MoveComponent(button01, 3, 4)
    );
  });
</script>

<main bind:this={mainElem}></main>

<style>
</style>
