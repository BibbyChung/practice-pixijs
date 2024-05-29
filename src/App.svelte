<script lang="ts">
  import { onMount } from "svelte";
  import { getButtonEntity } from "./lib/entities/button-entity";
  import { getRootContainerEntity } from "./lib/entities/root-container-entity";
  import { getTextEntity } from "./lib/entities/text-entity";
  import { getGameEngine, initGameEngine } from "./lib/game-engine";

  let mainElem: HTMLElement;

  onMount(async () => {
    const _w = window;

    await initGameEngine(mainElem, _w);

    const world = getGameEngine();

    const rootContainerEntity = getRootContainerEntity();
    world.addEntity(rootContainerEntity);

    // 創建一個文字
    const textEntity = getTextEntity();
    world.addEntity(textEntity);

    // 創建一個 button
    const buttonEntity = getButtonEntity();
    world.addEntity(buttonEntity);
  });
</script>

<main bind:this={mainElem}></main>

<style>
</style>
