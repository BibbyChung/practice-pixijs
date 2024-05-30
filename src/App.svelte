<script lang="ts">
  import { onMount } from "svelte";
  import { getSpriteEntity } from "./lib/entities/sprite-entity";
  import { getRootContainerEntity } from "./lib/entities/container-entity";
  import { getTextEntity } from "./lib/entities/text-entity";
  import { getGameEngine, initGameEngine } from "./lib/game-engine";

  let mainElem: HTMLElement;

  onMount(async () => {
    const _w = window;

    await initGameEngine(mainElem, _w);

    const world = getGameEngine();

    const rec = getRootContainerEntity();
    world.addEntityWithComponent(rec.entity, rec.componetKV);

    // 創建一個文字
    const te = getTextEntity();
    world.addEntityWithComponent(te.entity, te.componentKV);

    // 創建一個 button
    const se = getSpriteEntity();
    world.addEntityWithComponent(se.entity, se.componentKV);
  });
</script>

<main bind:this={mainElem}></main>

<style>
</style>
