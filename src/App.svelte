<script lang="ts">
  import { onMount } from "svelte";
  import { ButtonEntity } from "./lib/entities/button-entity";
  import { RootContainerEntity } from "./lib/entities/root-container-entity";
  import { TextEntity } from "./lib/entities/text-entity";
  import { getGameEngine, initGameEngine } from "./lib/game-engine";

  let mainElem: HTMLElement;

  onMount(async () => {
    const _w = window;

    await initGameEngine(mainElem, _w);

    const world = getGameEngine();
    await world.pixiAsssets.setLoadScreenAssetsBundle();

    const rootContainer01 = new RootContainerEntity();
    world.addEntity(rootContainer01);

    // 創建一個文字
    const textObj01 = new TextEntity("Hello, Pixi!", {
      fontSize: 48,
      fill: "white",
      align: "center",
    });
    world.addEntity(textObj01);

    // 創建一個 button
    const button01 = new ButtonEntity();
    world.addEntity(button01);
  });
</script>

<main bind:this={mainElem}></main>

<style>
</style>
